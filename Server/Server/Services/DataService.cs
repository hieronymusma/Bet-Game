using Server.DataStorage;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Services
{
    public class DataService : IDataService
    {
        private readonly DatabaseContext mContext;
        private readonly IGuidService mGuidService;

        public DataService(DatabaseContext context, IGuidService guidService)
        {
            mContext = context ?? throw new ArgumentNullException(nameof(context));
            mGuidService = guidService ?? throw new ArgumentNullException(nameof(guidService));
        }

        public void BookTransaction(Transaction transaction)
        {            
            if (mContext.Accounts.Where(a => a.GUID == transaction.User.GUID).Count() == 0)
            {
                throw new InvalidOperationException($"User with GUID {transaction.User.GUID} not found");
            }

            var user = mContext.Accounts.First(a => a.GUID == transaction.User.GUID);
            if (transaction.BetMoney > user.Saldo)
            {
                throw new InvalidOperationException($"User {user.FirstName} {user.LastName} tries to Bet {transaction.BetMoney} but Saldo is {user.Saldo}");
            }

            if (mContext.Transactions.Where(t => t.User.GUID == transaction.User.GUID).Count() > 0)
            {
                throw new InvalidOperationException($"User {user.FirstName} {user.LastName} already has an pending transaction");
            }

            mContext.Transactions.Add(transaction);
            mContext.SaveChanges();
        }

        public string CreateUserAndReturnGuid(string firstName, string lastName)
        {
            var newGuid = mGuidService.CreateUserWithUniqueGuid(firstName, lastName);
            return newGuid.ToString();
        }

        public User GetAccountInformation(Guid guid)
        {
            return mContext.Accounts.Where(x => x.GUID == guid).Single();
        }

        public bool IsAlreadyAnTransactionPending(Guid guid)
        {
            return mContext.Transactions.Where(t => t.User.GUID == guid).Count() > 0;
        }

        public bool IsUserValid(Guid guid)
        {
            return mContext.Accounts.Where(account => account.GUID == guid).Count() > 0;
        }

        public void RecreateDatabase()
        {
            mContext.Database.EnsureDeleted();
            mContext.Database.EnsureCreated();
        }

        public IEnumerable<UserStatus> GetUserStatus()
        {
            var userStatusList = new List<UserStatus>();
            foreach(var user in mContext.Accounts)
            {
                var hasTransaction = mContext.Transactions.Where(t => t.UserId == user.UserId).Count() > 0;
                var userStatus = new UserStatus { User = user, HasTransaction = hasTransaction };
                userStatusList.Add(userStatus);
            }
            return userStatusList;
        }

        public void BookTransactions(BetTarget target)
        {
            foreach(var transaction in mContext.Transactions)
            {
                var newMoney = transaction.BetTarget == target ? transaction.BetMoney : -transaction.BetMoney;
                var user = mContext.Accounts.Single(u => u.UserId == transaction.UserId);
                user.Saldo += newMoney;
            }
            DeleteTransactions();
        }

        public void DeleteTransactions()
        {
            mContext.Transactions.RemoveRange(mContext.Transactions);
            mContext.SaveChanges();
        }
    }
}
