using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Server.Helper
{
    public static class Throw
    {
        public static void IfNull<T>(Expression<Func<T>> argumentFunc) where T : class
        {
            if (argumentFunc.Compile()() == null)
            {
                var stackTrace = new StackTrace();
                var method = stackTrace.GetFrame(1).GetMethod();
                var declaringTypeName = method.DeclaringType.Name;
                var methodName = method.Name;
                var argumentName = (argumentFunc.Body as MemberExpression).Member.Name;

                throw new ArgumentNullException($"Method '{declaringTypeName}.{methodName}' was called with '{argumentName}'=null.");
            }
        }

        public static void IfNullOrWhitespace(Expression<Func<string>> argumentFunc)
        {
            var value = argumentFunc.Compile()();
            if (string.IsNullOrWhiteSpace(value))
            {
                var stackTrace = new StackTrace();
                var method = stackTrace.GetFrame(1).GetMethod();
                var declaringTypeName = method.DeclaringType.Name;
                var methodName = method.Name;
                var argumentName = (argumentFunc.Body as MemberExpression).Member.Name;

                throw new ArgumentNullException($"Method '{declaringTypeName}.{methodName}' was called with '{argumentName}'=null or whitespace.");
            }
        }
    }
}
