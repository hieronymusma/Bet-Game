using Microsoft.EntityFrameworkCore;

namespace Server.DataStorage
{
    public class DatabaseContext : DbContext
    {
        private static object lockObject = new object();

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
            lock (lockObject)
            {
                Database.EnsureCreated();
            }
        }

        public DbSet<User> Accounts { get; set; }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
