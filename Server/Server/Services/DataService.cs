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

        public string CreateUserAndReturnGuid(string firstName, string lastName)
        {
            var newGuid = mGuidService.CreateUserWithUniqueGuid(firstName, lastName);
            return newGuid.ToString();
        }

        public bool IsUserValid(Guid guid)
        {
            return mContext.Accounts.Where(account => account.GUID == guid).Count() > 0;
        }
    }
}
