using Mapster;
using Ordering.API.Application.Features.UpdateOrder;
using Ordering.API.Domain.Entities;

namespace Ordering.API.Mappers
{
    public class OrderMapperConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UpdateOrderCommand, Order>()
                .Ignore(e => e.Id);
        }
    }
}
