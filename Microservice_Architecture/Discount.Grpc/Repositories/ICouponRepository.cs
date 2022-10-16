using System.Data.Common;
using Dapper;
using Discount.Grpc.Entities;

namespace Discount.Grpc.Repositories
{
    public interface ICouponRepository
    {
        Task<Coupon> GetCouponByProductName(string productName);

        Task<bool> CreateCoupon(Coupon coupon);

        Task<bool> UpdateCoupon(Coupon coupon);

        Task<bool> DeleteCouponByProductName(string productName);
    }

    public class CouponRepository : ICouponRepository
    {
        private readonly DbConnection _db;

        public CouponRepository(DbConnection db)
        {
            _db = db;
        }

        public async Task<bool> CreateCoupon(Coupon coupon)
        {
            var param = new DynamicParameters(coupon);
            param.Output(coupon, coupon => coupon.Id);
            return await _db.ExecuteAsync(
                 "INSERT INTO Coupon (ProductName, Description, Amount) VALUES (@ProductName, @Description, @Amount);" +
                 "SELECT @Id = SCOPE_IDENTITY();",
                            param) == 1;
        }

        public async Task<bool> DeleteCouponByProductName(string productName)
        {
            return await _db.ExecuteAsync("DELETE FROM Coupon WHERE ProductName = @p",
                new { p = productName }) == 1;
        }

        public async Task<Coupon> GetCouponByProductName(string productName)
        {
            return await _db.QueryFirstOrDefaultAsync<Coupon>(
                "SELECT TOP 1 * FROM Coupon WHERE ProductName = @p",
                new { p = productName })
                ?? new Coupon
                {
                    ProductName = "No Discount",
                    Description = "No Discount"
                };
        }

        public async Task<bool> UpdateCoupon(Coupon coupon)
        {

            return await _db.ExecuteAsync
                    ("UPDATE Coupon SET ProductName=@ProductName, Description = @Description, Amount = @Amount WHERE Id = @Id",
                            coupon) == 1;

        }
    }
}
