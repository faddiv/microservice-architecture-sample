using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.API.Application.Contracts.Emails
{
    public interface IEmailService
    {
        Task<bool> SendEmail(Email email);
    }
}
