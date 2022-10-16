using Discount.API.Entities;

namespace Discount.API.Repositories;

public interface ICouponRepository
{
    Task<Coupon> GetCouponByProductName(string productName);

    Task<bool> CreateCoupon(Coupon coupon);

    Task<bool> UpdateCoupon(Coupon coupon);

    Task<bool> DeleteCouponByProductName(string productName);
}
