using Microsoft.AspNetCore.SignalR;
using Server.Services;
using System;

namespace Server.BetHub
{
    public class BetHub : Hub
    {
        private readonly IDataService mDataService;

        public BetHub(IDataService dataService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
        }

        public bool IsUserValid(string guidString)
        {
            var guid = Guid.Parse(guidString);
            return mDataService.IsUserValid(guid);
        }
    }
}
