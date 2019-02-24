using Server.DataStorage;
using System;
using System.Collections.Generic;

namespace Server.Services
{
    public interface IDataService
    {
        bool IsUserValid(Guid guid);

        string CreateUserAndReturnGuid(string fristName, string lastName);

        User GetAccountInformation(Guid guid);

        void BookTransaction(Transaction transaction);

        bool IsAlreadyAnTransactionPending(Guid guid);

        void RecreateDatabase();

        IEnumerable<UserStatus> GetUserStatus();
    }
}
