using System;

namespace Server.Services
{
    public interface IDataService
    {
        bool IsUserValid(Guid guid);
    }
}
