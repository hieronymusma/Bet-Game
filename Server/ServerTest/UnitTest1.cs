using Microsoft.VisualStudio.TestTools.UnitTesting;
using Server.Helper;

namespace ServerTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Test();
        }

        private void Test()
        {
            Test2(null);
        }

        private void Test2(string name)
        {
            Throw.IfNull(() => name);
        }
    }
}
