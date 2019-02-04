using Server.DataStorage;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Services
{
    public class DataService
    {
        private readonly ConcurrentBag<Account> accounts;
        private readonly object lockObject = new object();

        public DataService()
        {
            accounts = new ConcurrentBag<Account>(DataReaderWriter.ReadData());
        }

        public Guid CreateAccount(string name)
        {
            var newAccount = new Account(name, Constants.StartMoney);
            accounts.Add(newAccount);

            lock (lockObject)
            {
                DataReaderWriter.WriteData(accounts.ToList());
            }

            return newAccount.ID;
        }

        public bool DoesAccountExist(Guid guid)
        {
            return accounts.Any(account => account.ID == guid);
        }
    }
}
