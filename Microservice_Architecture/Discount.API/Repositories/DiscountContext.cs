using Discount.API.Entities;
using MongoDB.Driver;

namespace Discount.API.Repositories;

public class DiscountContext : IDiscountContext
{
    public DiscountContext(IMongoClient client)
    {
        var catalogDB = client.GetDatabase("DiscountDB");
        Coupons = catalogDB.GetCollection<Coupon>("coupons");
    }

    public IMongoCollection<Coupon> Coupons { get; }
}
