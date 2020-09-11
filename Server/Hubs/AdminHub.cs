using Microsoft.AspNetCore.SignalR;
using Server.DataStorage;
using Server.Services;
using System;
using System.Collections.Generic;

namespace Server.Hubs
{
    public class AdminHub : Hub
    {
        private readonly IDataService mDataService;
        private readonly IHubContext<BetHub> mBetHubContext;
        private readonly IRefreshService mRefreshService;
        private readonly IHubContext<DashboardHub> mDashboardHubContext;

        public AdminHub(IDataService dataService,
            IHubContext<BetHub> betHubContext,
            IHubContext<DashboardHub> dashboardHubContext,
            IRefreshService refreshService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
            mBetHubContext = betHubContext ?? throw new ArgumentNullException(nameof(betHubContext));
            mRefreshService = refreshService ?? throw new ArgumentNullException(nameof(refreshService));
            mDashboardHubContext = dashboardHubContext ?? throw new ArgumentNullException(nameof(dashboardHubContext));
        }

        public void RecreateDatabase()
        {
            mDataService.RecreateDatabase();
            mRefreshService.UpdateUserDashboard();
        }

        public void BookTransactions(BetTarget target)
        {
            mDataService.BookTransactions(target);
            mRefreshService.UpdateUserDashboard();
            mBetHubContext.Clients.All.SendAsync("WaitingFinished");
        }

        public void DeleteTransactions()
        {
            mDataService.DeleteTransactions();
            mRefreshService.UpdateUserDashboard();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return mDataService.GetAllUsers();
        }

        public void ChangeMoney(User user, int money)
        {
            mDataService.ChangeMoney(user, money);
            mRefreshService.UpdateUserDashboard();
            mBetHubContext.Clients.All.SendAsync("UpdatedMoney");
        }

        public string CreateUserAndReturnGuid(string firstname, string lastname)
        {
            var guid = mDataService.CreateUserAndReturnGuid(firstname, lastname);

            mRefreshService.UpdateUserDashboard();

            return guid;
        }

        public bool BookTransaction(Transaction transaction)
        {
            try
            {
                mDataService.BookTransaction(transaction);
            }
            catch (InvalidOperationException ex)
            {
                throw ex;
            }

            mRefreshService.UpdateUserDashboard();
            return true;
        }

        public void ToggleDashboardMode()
        {
            mDashboardHubContext.Clients.All.SendAsync("ToggleDashboardMode");
        }
    }
}
