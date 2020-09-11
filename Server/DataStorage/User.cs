using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DataStorage
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid GUID { get; set; }
        public int Saldo { get; set; }
    }
}
