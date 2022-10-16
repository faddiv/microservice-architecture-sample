using MongoDB.Driver;
using Ordering.API.Domain.Entities;

namespace Ordering.API.Infrastructure.Persistence
{
    public interface IOrderingContext
    {
        IMongoCollection<Order> Orders { get; }
    }
}