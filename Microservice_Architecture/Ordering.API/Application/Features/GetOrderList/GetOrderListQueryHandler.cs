using MediatR;
//using Microsoft.EntityFrameworkCore;
using Ordering.API.Application.Contracts.Persistence;
using Ordering.API.Extensions;
using Ordering.API.Mappers;

namespace Ordering.API.Application.Features.GetOrderList
{
    public class GetOrderListQueryHandler : IRequestHandler<GetOrderListQuery, List<OrderModel>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderMapper _mapper;

        public GetOrderListQueryHandler(
            IOrderRepository orderRepository,
            IOrderMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        public async Task<List<OrderModel>> Handle(GetOrderListQuery request, CancellationToken cancellationToken)
        {
            var list = await _orderRepository
                .GetOrdersByUserName(request.UserName!)
                .Select(_mapper.ProjectToDto)
                .ToListAsync(cancellationToken: cancellationToken);
            return list;
        }
    }
}
