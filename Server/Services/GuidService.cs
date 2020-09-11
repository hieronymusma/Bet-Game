using Server.DataStorage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class GuidService : IGuidService
    {
        private readonly DatabaseContext mContext;
        private static readonly object lockObject = new object();

        public GuidService(DatabaseContext context)
        {
            mContext = context ?? throw new ArgumentException(nameof(context));
        }

        public Guid CreateUserWithUniqueGuid(string firstName, string lastName)
        {
            var newGuid = Guid.NewGuid();

            lock (lockObject)
            {
                while (mContext.Accounts.Where(account => account.GUID == newGuid).Count() > 0)
                {
                    newGuid = Guid.NewGuid();
                }

                var newUser = new User()
                {
                    FirstName = firstName,
                    LastName = lastName,
                    GUID = newGuid,
                    Saldo = Constants.StartMoney
                };

                mContext.Accounts.Add(newUser);
                mContext.SaveChanges();
            }

            return newGuid;
        }
    }
}
