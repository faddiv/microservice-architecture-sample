using MediatR;
using Ordering.API.Application.Contracts.Persistence;
using Ordering.API.Mappers;
using System.Diagnostics;

namespace Ordering.API.Application.Features.UpdateOrder
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand>
    {
        private readonly IOrderRepository _repository;
        private readonly IOrderMapper _mapper;

        public UpdateOrderCommandHandler(IOrderRepository repository, IOrderMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _repository.GetOrderById(request.Id);

            Debug.Assert(order != null);

            _mapper.CopyToOrder(request, order);

            await _repository.UpdateOrder(order);
            return Unit.Value;
        }
    }
}
