using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DataStorage
{
    public class UserStatus
    {
        public User User { get; set; }
        public bool HasTransaction { get; set; }
    }
}
