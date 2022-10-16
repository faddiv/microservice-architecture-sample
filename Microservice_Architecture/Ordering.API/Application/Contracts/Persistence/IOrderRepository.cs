using Ordering.API.Domain.Entities;

namespace Ordering.API.Application.Contracts.Persistence
{
    public interface IOrderRepository
    {
        IQueryable<Order> GetOrdersByUserName(string userName);
        Task AddOrder(Order order);
        Task<Order?> GetOrderById(string id);
        Task UpdateOrder(Order order);
        Task DeleteOrder(Order order);
    }
}
