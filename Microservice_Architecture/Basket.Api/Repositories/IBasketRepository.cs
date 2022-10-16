using Basket.Api.Entites;

namespace Basket.Api.Repositories
{
    public interface IBasketRepository
    {
        Task<ShoppingCart?> GetBasket(string username, CancellationToken token);
        Task UpdateBasket(ShoppingCart cart, CancellationToken token);
        Task DeleteBasket(string username, CancellationToken token);
    }
}
