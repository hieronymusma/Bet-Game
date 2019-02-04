using System;

namespace Server.DataStorage
{
    public class Account
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public int Saldo { get; set; }

        public Account(string Name, int Saldo)
        {
            this.Name = Name;
            this.Saldo = Saldo;
            this.ID = Guid.NewGuid();
        }
    }
}
