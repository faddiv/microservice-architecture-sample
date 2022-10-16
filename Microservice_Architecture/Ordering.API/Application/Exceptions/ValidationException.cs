using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.API.Application.Exceptions
{

    [Serializable]
    public class ValidationException : Exception
    {
        public ValidationException(IEnumerable<ValidationFailure> failures)
        {
            Data["Errors"] = failures.ToList();
        }
        public ValidationException(string message) : base(message) { }
        public ValidationException(string message, Exception inner) : base(message, inner) { }
        protected ValidationException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
