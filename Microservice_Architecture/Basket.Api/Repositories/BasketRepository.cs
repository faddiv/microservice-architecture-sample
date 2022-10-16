using Basket.Api.Entites;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Basket.Api.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDistributedCache _cache;

        public BasketRepository(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<ShoppingCart?> GetBasket(string username, CancellationToken token)
        {
            var json = await _cache.GetStringAsync(username, token);
            if(json == null)
                return null;
            return JsonSerializer.Deserialize<ShoppingCart>(json);
        }

        public async Task UpdateBasket(ShoppingCart cart, CancellationToken token)
        {
            await _cache.SetStringAsync(cart.UserName, JsonSerializer.Serialize(cart), token);
        }

        public async Task DeleteBasket(string username, CancellationToken token)
        {
            await _cache.RemoveAsync(username, token);
        }
    }
}
