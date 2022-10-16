using Basket.Api.Entites;
using Basket.Api.Mappers;
using Basket.Api.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API;

public static class BasketApi
{
    public static void Register(IEndpointRouteBuilder app)
    {
        app.MapGet("/basket/{userName}", GetBasket);
        app.MapPost("/basket", UpdateBasket);
        app.MapDelete("/basket/{userName}", DeleteBasket);
        app.MapPost("/basket/checkout", Checkout);
    }

    [ProducesResponseType(typeof(ShoppingCart), StatusCodes.Status200OK)]
    private static async Task<IResult> GetBasket(
        [FromRoute] string userName,
        [FromServices] IBasketRepository cache,
        CancellationToken token)
    {
        var result = await cache.GetBasket(userName, token);
        return Results.Ok(result ?? new Api.Entites.ShoppingCart { UserName = userName });
    }

    [ProducesResponseType(typeof(ShoppingCart), StatusCodes.Status200OK)]
    private static async Task<IResult> UpdateBasket(
        [FromBody] ShoppingCart cart,
        [FromServices] IBasketRepository cache,
        [FromServices] IDiscountService service,
        CancellationToken token)
    {
        foreach (var item in cart.Items)
        {
            var coupon = await service.GetDiscount(item.ProductName);
            item.Discount = coupon.Amount;
        }
        await cache.UpdateBasket(cart, token);
        return Results.Ok(cart);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> DeleteBasket(
        [FromRoute] string userName,
        [FromServices] IBasketRepository cache,
        CancellationToken token)
    {
        await cache.DeleteBasket(userName, token);
        return Results.Ok();
    }

    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    private static async Task<IResult> Checkout(
        [FromBody] BasketCheckout basketCheckout,
        [FromServices] IBasketRepository cache,
        [FromServices] IBasketMapper mapper,
        [FromServices] IPublishEndpoint publishEndpoint,
        CancellationToken token)
    {
        var basket = await cache.GetBasket(basketCheckout.UserName, token);
        if (basket is null)
            return Results.BadRequest($"No basket for {basketCheckout.UserName}");
        basketCheckout.TotalPrice = basket.TotalPrice;
        var evt = mapper.MapTo(basketCheckout);
        await publishEndpoint.Publish(evt, token);
        await cache.DeleteBasket(basketCheckout.UserName, token);
        return Results.Accepted();
    }
}
