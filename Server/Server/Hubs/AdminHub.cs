﻿using Microsoft.AspNetCore.SignalR;
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

        public AdminHub(IDataService dataService, IHubContext<BetHub> betHubContext, IRefreshService refreshService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
            mBetHubContext = betHubContext ?? throw new ArgumentNullException(nameof(betHubContext));
            mRefreshService = refreshService ?? throw new ArgumentNullException(nameof(refreshService));
        }

        public void RecreateDatabase()
        {
            mDataService.RecreateDatabase();
        }

        public void BookTransactions(BetTarget target)
        {
            mDataService.BookTransactions(target);
            mRefreshService.UpdateUserDashboard();
            mBetHubContext.Clients.All.SendAsync("WaitingFinished").Wait();
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
            mBetHubContext.Clients.All.SendAsync("UpdatedMoney").Wait();
        }
    }
}
