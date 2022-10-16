using Basket.Api.Entites;
using EventBus.Messages.Events;
using Mapster;

namespace Basket.Api.Mappers
{
    [Mapper]
    public interface IBasketMapper
    {
        BasketCheckoutEvent MapTo(BasketCheckout coupon);

    }
}
