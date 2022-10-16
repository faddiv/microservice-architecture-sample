using MediatR;
using Ordering.API.Application.Contracts.Persistence;
using System.Diagnostics;

namespace Ordering.API.Application.Features.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
    {
        private readonly IOrderRepository _repository;
        private readonly ILogger<DeleteOrderCommandHandler> _logger;

        public DeleteOrderCommandHandler(
            IOrderRepository repository,
            ILogger<DeleteOrderCommandHandler> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _repository.GetOrderById(request.Id);
            Debug.Assert(order != null);

            await _repository.DeleteOrder(order);

            return Unit.Value;
        }
    }
}
