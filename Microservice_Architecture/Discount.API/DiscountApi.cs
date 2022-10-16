using Discount.API.Entities;
using Discount.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Discount.API;

public static class DiscountApi
{
    public static void Register(IEndpointRouteBuilder app)
    {
        app.MapGet("/discount/{productName}", GetCoupon)
            .WithName("GetCoupon");
        app.MapPost("/discount", CreateCoupon);
        app.MapPut("/discount/{productName}", UpdateCoupon);
        app.MapDelete("/discount/{productName}", DeleteCoupon);
    }

    [ProducesResponseType(typeof(Coupon), StatusCodes.Status200OK)]
    private static async Task<IResult> GetCoupon(
        [FromRoute]string productName,
        [FromServices] ICouponRepository repository)
    {
        return Results.Ok(await repository.GetCouponByProductName(productName));
    }

    [ProducesResponseType(typeof(Coupon), StatusCodes.Status201Created)]
    private static async Task<IResult> CreateCoupon(
        [FromBody] Coupon coupon,
        [FromServices] ICouponRepository repository)
    {
        await repository.CreateCoupon(coupon);
        return Results.CreatedAtRoute("GetCoupon", new { coupon.ProductName }, coupon);
    }

    [ProducesResponseType(typeof(Coupon), StatusCodes.Status200OK)]
    private static async Task<IResult> UpdateCoupon(
        [FromRoute] string productName,
        [FromBody] Coupon coupon,
        [FromServices] ICouponRepository repository)
    {
        coupon.ProductName = productName;
        await repository.UpdateCoupon(coupon);
        return Results.Ok(coupon);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> DeleteCoupon(
        [FromRoute] string productName,
        [FromServices] ICouponRepository repository)
    {
        await repository.DeleteCouponByProductName(productName);
        return Results.Ok();
    }
}
