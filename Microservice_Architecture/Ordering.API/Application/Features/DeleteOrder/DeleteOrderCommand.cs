using MediatR;

namespace Ordering.API.Application.Features.DeleteOrder
{
    public class DeleteOrderCommand : IRequest
    {
        public string Id { get; set; }
    }
}
