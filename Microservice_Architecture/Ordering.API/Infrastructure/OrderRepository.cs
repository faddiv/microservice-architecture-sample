using MongoDB.Driver;
using Ordering.API.Application.Contracts.Persistence;
using Ordering.API.Domain.Entities;
using Ordering.API.Infrastructure.Persistence;

namespace Ordering.API.Infrastructure
{
    public class OrderRepository : IOrderRepository
    {
        private const string _defaultUser = "default user";
        private readonly IOrderingContext _db;

        public OrderRepository(IOrderingContext context)
        {
            _db = context;
        }
        public async Task AddOrder(Order order)
        {
            order.CreatedBy = _defaultUser;
            order.CreatedDate = DateTime.Now;
            order.LastModifiedBy = _defaultUser;
            order.LastModifiedDate = DateTime.Now;
            await _db.Orders.InsertOneAsync(order);
        }

        public async Task DeleteOrder(Order order)
        {
            await _db.Orders.DeleteOneAsync(e => e.Id == order.Id);
        }

        public async Task<Order?> GetOrderById(string id)
        {
            var result = _db.Orders.Find(e => e.Id == id);
            return await result.FirstOrDefaultAsync();
        }

        public IQueryable<Order> GetOrdersByUserName(string userName)
        {
            return _db.Orders.AsQueryable()
                .Where(e => e.UserName == userName);
        }

        public async Task UpdateOrder(Order order)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Id, order.Id);
            order.LastModifiedBy = _defaultUser;
            order.LastModifiedDate = DateTime.Now;
            await _db.Orders.ReplaceOneAsync(filter, order);
        }
    }
}
