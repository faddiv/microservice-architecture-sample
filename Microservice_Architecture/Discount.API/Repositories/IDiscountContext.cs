using Discount.API.Entities;
using MongoDB.Driver;

namespace Discount.API.Repositories
{
    public interface IDiscountContext
    {
        IMongoCollection<Coupon> Coupons { get; }
    }
}