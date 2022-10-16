using Discount.API.Entities;
using Discount.API.Mappers;
using Discount.Grpc;

namespace Discount.API.Mappers
{
    public partial class CouponMapper : ICouponMapper
    {
        public CouponMessage MapTo(Coupon p1)
        {
            return p1 == null ? null : new CouponMessage()
            {
                Id = p1.Id,
                ProductName = p1.ProductName,
                Description = p1.Description,
                Amount = p1.Amount
            };
        }
        public Coupon MapTo(CouponMessage p2)
        {
            return p2 == null ? null : new Coupon()
            {
                Id = p2.Id,
                ProductName = p2.ProductName,
                Description = p2.Description,
                Amount = p2.Amount
            };
        }
    }
}