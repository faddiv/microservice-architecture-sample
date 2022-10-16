using Ocelot.Middleware;
using Ocelot.Multiplexer;
using OctelotApiGateway.Models;
using System.Text.Json;

namespace OctelotApiGateway;

public class BasketAggregator : IDefinedAggregator
{
    public async Task<DownstreamResponse> Aggregate(List<HttpContext> responses)
    {
        ShoppingCart? cart = null;
        List<Product>? products = null;
        foreach (var httpContext in responses)
        {
            var route = httpContext.Items.DownstreamRoute();
            if (route.Key == "Basket")
            {
                cart = await GetBasket(httpContext.Items.DownstreamResponse());
            }
            else if (route.Key == "Catalog")
            {
                products = await GetCatalog(httpContext.Items.DownstreamResponse());
            }
        }
        if (cart == null || products == null)
        {
            return new DownstreamResponse(new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest)
            {
                Content = new StringContent("Unknown basket")
            });
        }
        var cartExt = MergeResponses(cart, products);
        return new DownstreamResponse(new HttpResponseMessage(System.Net.HttpStatusCode.OK)
        {
            Content = JsonContent.Create(cartExt)
        });
    }

    private static ShoppingCartExt MergeResponses(ShoppingCart cart, List<Product> products)
    {
        return new ShoppingCartExt
        {
            Items = cart.Items.Join(products, c => c.ProductId, p => p.Id, (c, p) => new ShoppingCartItemExt
            {
                Category = p.Category,
                Color = c.Color,
                Description = p.Description,
                Discount = c.Discount,
                ImageFile = p.ImageFile,
                Price = p.Price,
                ProductId = p.Id,
                ProductName = p.Name,
                Quantity = c.Quantity,
                Summary = p.Summary
            }).ToList(),
            TotalPrice = cart.TotalPrice,
            UserName = cart.UserName
        };
    }

    private async Task<ShoppingCart?> GetBasket(DownstreamResponse downstreamResponse)
    {
        var stream = await downstreamResponse.Content.ReadAsStreamAsync();

        var cart = JsonSerializer.Deserialize<ShoppingCart>(stream, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        return cart;
    }
    private async Task<List<Product>?> GetCatalog(DownstreamResponse downstreamResponse)
    {
        var stream = await downstreamResponse.Content.ReadAsStreamAsync();

        var catalog = JsonSerializer.Deserialize<List<Product>>(stream, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        return catalog;
    }
}

public static class HttpResponsesExtensions
{
    public static HttpContext? GetHttpContext(this List<HttpContext> contexts, string name)
    {
        return contexts.Find(ctx => ctx.GetEndpoint()?.DisplayName == name);
    }
}
