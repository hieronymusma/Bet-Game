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

        public int CreateAccount(string name)
        {
            lock(lockObject)
            {
                var maxId = accounts.Count == 0 ? 0 : accounts.Max(account => account.ID);
                var newAccount = new Account()
                {
                    ID = maxId + 1,
                    Name = name,
                    Saldo = Constants.Constants.StartMoney
                };
                accounts.Add(newAccount);
                DataReaderWriter.WriteData(accounts.ToList());
                return maxId;
            }
        }

        public bool DoesAccountExist(int id)
        {
            return accounts.Any(account => account.ID == id);
        }
    }
}
