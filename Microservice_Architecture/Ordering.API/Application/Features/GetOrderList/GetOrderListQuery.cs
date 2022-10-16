using MediatR;

namespace Ordering.API.Application.Features.GetOrderList
{
    public class GetOrderListQuery : IRequest<List<OrderModel>>
    {
        public string? UserName { get; set; }
        public static bool TryParse(string input, out GetOrderListQuery query)
        {
            query = new GetOrderListQuery
            {
                UserName = input
            };
            return true;
        }
    }
}
