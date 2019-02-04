using Microsoft.AspNetCore.SignalR;
using Server.Services;

namespace Server.BetHub
{
    public class BetHub : Hub
    {
        private DataService dataService;

        public BetHub(DataService dataService)
        {
            this.dataService = dataService;
        }

        public string TestMe(string message)
        {
            string connId = Context.ConnectionId;
            dataService.CreateAccount("Maurice Hieronymus");
            return message;
        }

        public void ServerCall()
        {
            Clients.All.SendAsync("ClientCall");
        }
    }
}
