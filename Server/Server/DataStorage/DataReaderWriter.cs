using System.Collections.Generic;
using System.IO;

namespace Server.DataStorage
{
    public static class DataReaderWriter
    {
        const string FILE_NAME = "accounts.json";

        public static void WriteData(List<Account> accounts)
        {
            JsonHandling.WriteToJsonFile(FILE_NAME, accounts);
        }

        public static List<Account> ReadData()
        {
            var data = new List<Account>();

            if (File.Exists(FILE_NAME))
            {
                data = JsonHandling.ReadFromJsonFile<List<Account>>(FILE_NAME);
            }

            return data;
        }
    }
}
