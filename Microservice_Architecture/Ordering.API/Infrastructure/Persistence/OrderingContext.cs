using MongoDB.Driver;
using Ordering.API.Domain.Entities;

namespace Ordering.API.Infrastructure.Persistence
{
    public class OrderingContext : IOrderingContext
    {
        public OrderingContext(IMongoClient client)
        {
            var catalogDB = client.GetDatabase("OrdersDB");
            Orders = catalogDB.GetCollection<Order>("orders");
        }
        public IMongoCollection<Order> Orders { get; }
    }
}
