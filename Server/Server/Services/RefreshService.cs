using Microsoft.AspNetCore.SignalR;
using Server.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class RefreshService : IRefreshService
    {
        private readonly IDataService mDataService;
        private readonly IHubContext<DashboardHub> mHubContext;

        public RefreshService(IDataService dataService, IHubContext<DashboardHub> hubContext)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
            mHubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
        }

        public void UpdateUserDashboard()
        {
            var data = mDataService.GetUserStatus();
            mHubContext.Clients.All.SendAsync("UpdateDashboard", data);
        }
    }
}
