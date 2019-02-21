using Microsoft.AspNetCore.SignalR;
using Server.Services;
using System;

namespace Server.Hubs
{
    public class AdminHub : Hub
    {
        private readonly IDataService mDataService;

        public AdminHub(IDataService dataService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
        }

        public void RecreateDatabase()
        {
            mDataService.RecreateDatabase();
        }
    }
}
