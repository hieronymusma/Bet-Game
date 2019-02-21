using Server.DataStorage;
using System;

namespace Server.Services
{
    public interface IDataService
    {
        bool IsUserValid(Guid guid);

        string CreateUserAndReturnGuid(string fristName, string lastName);

        User GetAccountInformation(Guid guid);

        void BookTransaction(Transaction transaction);

        bool IsAlreadyAnTransactionPending(Guid guid);
    }
}
