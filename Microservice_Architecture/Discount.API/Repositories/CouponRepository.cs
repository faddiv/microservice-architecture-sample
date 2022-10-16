using Discount.API.Entities;
using MongoDB.Driver;

namespace Discount.API.Repositories;

public class CouponRepository : ICouponRepository
{
    private readonly IDiscountContext _db;

    public CouponRepository(IDiscountContext db)
    {
        _db = db;
    }

    public async Task<bool> CreateCoupon(Coupon coupon)
    {
        await _db.Coupons.InsertOneAsync(coupon);
        return true;
    }

    public async Task<bool> DeleteCouponByProductName(string productName)
    {
        var result = await _db.Coupons.DeleteOneAsync(e => e.ProductName == productName);
        return result.IsAcknowledged;
    }

    public async Task<Coupon> GetCouponByProductName(string productName)
    {
        var filter = Builders<Coupon>.Filter.Eq(o => o.ProductName, productName);
        var result = _db.Coupons.Find(filter);
        return await result.FirstOrDefaultAsync()
            ?? new Coupon
            {
                ProductName = "No Discount",
                Description = "No Discount",
                Amount = 0,
                Id = ""
            };
    }

    public async Task<bool> UpdateCoupon(Coupon coupon)
    {
        var filter = Builders<Coupon>.Filter.Eq(o => o.Id, coupon.Id);
        var result = await _db.Coupons.ReplaceOneAsync(filter, coupon);
        return result.IsAcknowledged;
    }
}
