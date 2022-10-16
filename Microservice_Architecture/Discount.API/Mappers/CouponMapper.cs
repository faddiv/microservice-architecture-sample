using Discount.API.Entities;
using Discount.Grpc;
using Mapster;

namespace Discount.API.Mappers
{
    [Mapper]
    public interface ICouponMapper
    {
        CouponMessage MapTo(Coupon coupon);

        Coupon MapTo(CouponMessage coupon);
    }
}
