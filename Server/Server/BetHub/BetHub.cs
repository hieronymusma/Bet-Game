using Microsoft.AspNetCore.SignalR;
using Server.Helper;
using Server.Services;
using System;
using System.Threading.Tasks;

namespace Server.BetHub
{
    public class BetHub : Hub
    {
        private DataService dataService;

        public BetHub(DataService dataService)
        {
            this.dataService = dataService;
        }

        string CreateAccount(string name)
        {
            Throw.IfNullOrWhitespace(() => name);

            return dataService.CreateAccount(name).ToString();
        }

        bool DoesAccountExist(string guid)
        {
            Throw.IfNullOrWhitespace(() => guid);

            var parsedGuid = Guid.Parse(guid);
            return dataService.DoesAccountExist(parsedGuid);
        }
    }
}
