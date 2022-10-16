using Ordering.API.Application.Contracts.Emails;

namespace Ordering.API.Infrastructure
{
    public class EmailService : IEmailService
    {
        public Task<bool> SendEmail(Email email)
        {
            return Task.FromResult(true);
        }
    }
}
