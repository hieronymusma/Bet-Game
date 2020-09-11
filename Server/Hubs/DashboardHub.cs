using Microsoft.AspNetCore.SignalR;
using Server.DataStorage;
using Server.Services;
using System;
using System.Collections.Generic;

namespace Server.Hubs
{
    public class DashboardHub : Hub
    {
        private readonly IDataService mDataService;

        public DashboardHub(IDataService dataService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
        }

        public IEnumerable<UserStatus> GetAllUser()
        {
            return mDataService.GetUserStatus();
        }

        public IEnumerable<Transaction> GetAllTransactions()
        {
            return mDataService.GetAllTransactions();
        }
    }
}
