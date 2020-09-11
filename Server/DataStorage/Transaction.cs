using System.ComponentModel.DataAnnotations;

namespace Server.DataStorage
{
    public enum BetTarget
    {
        Blue = 0,
        Red = 1
    }

    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int BetMoney { get; set; }
        public BetTarget BetTarget { get; set; }
    }
}
