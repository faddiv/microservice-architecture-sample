using EventBus.Messages.Events;
using Mapster;
using Ordering.API.Application.Features.CheckoutOrder;
using Ordering.API.Application.Features.GetOrderList;
using Ordering.API.Application.Features.UpdateOrder;
using Ordering.API.Domain.Entities;
using System.Linq.Expressions;

namespace Ordering.API.Mappers
{
    [Mapper]
    public interface IOrderMapper
    {
        Expression<Func<Order, OrderModel>> ProjectToDto { get; }

        Order MapToOrder(CheckoutOrderCommand command);

        Order CopyToOrder(UpdateOrderCommand dto, Order customer);

        CheckoutOrderCommand MapToCheckoutOrderCommand(BasketCheckoutEvent @event);
    }
}
