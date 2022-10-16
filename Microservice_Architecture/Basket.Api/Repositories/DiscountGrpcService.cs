using Discount.Grpc;
using Grpc.Core;
using static Discount.Grpc.DiscountGrpc;

namespace Basket.Api.Repositories
{
    public class DiscountGrpcService : IDiscountService
    {
        private readonly DiscountGrpcClient _grpc;

        public DiscountGrpcService(DiscountGrpcClient grpc)
        {
            _grpc = grpc;
        }

        public async Task<CouponMessage> GetDiscount(string productName)
        {
            return await _grpc.GetDiscountAsync(new ProductNameRequest
            {
                ProductName = productName
            });
        }
    }
}
