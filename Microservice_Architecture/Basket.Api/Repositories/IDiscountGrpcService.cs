using Discount.Grpc;

namespace Basket.Api.Repositories
{
    public interface IDiscountService
    {
        Task<CouponMessage> GetDiscount(string productName);
    }
}