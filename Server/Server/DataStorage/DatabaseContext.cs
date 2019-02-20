using Microsoft.EntityFrameworkCore;

namespace Server.DataStorage
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
            Database.EnsureCreated();
        }

        public DbSet<User> Accounts { get; set; }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
