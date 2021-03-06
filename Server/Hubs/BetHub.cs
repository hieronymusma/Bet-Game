﻿using Microsoft.AspNetCore.SignalR;
using Server.DataStorage;
using Server.Services;
using System;

namespace Server.Hubs
{
    public class BetHub : Hub
    {
        private readonly IDataService mDataService;
        private readonly IRefreshService mRefreshService;

        public BetHub(IDataService dataService, IRefreshService refreshService)
        {
            mDataService = dataService ?? throw new ArgumentNullException(nameof(dataService));
            mRefreshService = refreshService ?? throw new ArgumentNullException(nameof(refreshService));
        }

        public bool IsUserValid(Guid guid)
        {
            return mDataService.IsUserValid(guid);
        }

        public string CreateUserAndReturnGuid(string firstname, string lastname)
        {
            if (string.IsNullOrWhiteSpace(firstname)) throw new ArgumentNullException(nameof(firstname));
            if (string.IsNullOrWhiteSpace(lastname)) throw new ArgumentNullException(nameof(lastname));

            var guid = mDataService.CreateUserAndReturnGuid(firstname, lastname);

            mRefreshService.UpdateUserDashboard();

            return guid;
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
            catch (InvalidOperationException ex)
            {
                throw ex;
            }

            mRefreshService.UpdateUserDashboard();
            return true;
        }

        public bool IsAlreadyAnTransactionPending(Guid guidString)
        {
            return mDataService.IsAlreadyAnTransactionPending(guidString);
        }
    }
}
