using Discount.Grpc.Entities;
using Mapster;

namespace Discount.Grpc.Mappers
{
    [Mapper]
    public interface ICouponMapper
    {
        CouponMessage MapTo(Coupon coupon);

        Coupon MapTo(CouponMessage coupon);
    }
}
