using Microsoft.AspNetCore.SignalR;

namespace Server.BetHub
{
    public class BetHub : Hub
    {
        public string TestMe(string message)
        {
            return message;
        }

        public void ServerCall()
        {
            Clients.All.SendAsync("ClientCall");
        }
    }
}
