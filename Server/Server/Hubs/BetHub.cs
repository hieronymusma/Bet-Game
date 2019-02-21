using Microsoft.AspNetCore.SignalR;
using Server.DataStorage;
using Server.Services;
using System;

namespace Server.Hubs
{
    public class BetHub : Hub
    {
        private readonly IDataService mDataService;

        public BetHub(IDataService dataService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
        }

        public bool IsUserValid(Guid guid)
        {
            return mDataService.IsUserValid(guid);
        }

        public string CreateUserAndReturnGuid(string firstname, string lastname)
        {
            if (string.IsNullOrWhiteSpace(firstname)) throw new ArgumentNullException(nameof(firstname));
            if (string.IsNullOrWhiteSpace(lastname)) throw new ArgumentNullException(nameof(lastname));

            return mDataService.CreateUserAndReturnGuid(firstname, lastname);
        }

        public User GetAccountInformation(Guid guid)
        {
            return mDataService.GetAccountInformation(guid);
        }

        public bool BookTransaction(Transaction transaction)
        {
            if (transaction == null) throw new ArgumentNullException(nameof(transaction));
            if (transaction.User == null) throw new ArgumentNullException(nameof(transaction));

            try
            {
                mDataService.BookTransaction(transaction);
            }
            catch (InvalidOperationException)
            {
                return false;
                throw;
            }
            return true;
        }

        public bool IsAlreadyAnTransactionPending(Guid guidString)
        {
            return mDataService.IsAlreadyAnTransactionPending(guidString);
        }
    }
}
