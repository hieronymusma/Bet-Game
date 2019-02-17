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

        public DataService(DatabaseContext context)
        {
            mContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public bool IsUserValid(Guid guid)
        {
            return mContext.Accounts.Where(account => account.GUID == guid).Count() > 0;
        }
    }
}
