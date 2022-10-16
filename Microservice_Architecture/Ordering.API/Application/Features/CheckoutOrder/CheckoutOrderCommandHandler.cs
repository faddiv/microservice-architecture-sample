using MediatR;
using Ordering.API.Application.Contracts.Emails;
using Ordering.API.Application.Contracts.Persistence;
using Ordering.API.Domain.Entities;
using Ordering.API.Mappers;

namespace Ordering.API.Application.Features.CheckoutOrder
{
    public class CheckoutOrderCommandHandler : IRequestHandler<CheckoutOrderCommand, string>
    {
        private readonly IOrderRepository _repository;
        private readonly IOrderMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly ILogger<CheckoutOrderCommandHandler> _logger;

        public CheckoutOrderCommandHandler(
            IOrderRepository repository,
            IOrderMapper mapper,
            IEmailService emailService,
            ILogger<CheckoutOrderCommandHandler> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<string> Handle(CheckoutOrderCommand request, CancellationToken cancellationToken)
        {
            var order = _mapper.MapToOrder(request);

            await _repository.AddOrder(order);

            await SendMail(order);

            return order.Id;
        }

        private async Task SendMail(Order order)
        {
            var email = new Email() { To = order.EmailAddress, Body = $"Order was created.", Subject = "Order was created" };

            try
            {
                await _emailService.SendEmail(email);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Order {order.Id} failed due to an error with the mail service: {ex.Message}");
            }
        }
    }
}
