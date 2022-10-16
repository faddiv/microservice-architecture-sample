using Catalog.API.Data;
using Catalog.API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API;

public static class CatalogApi
{
    public static void Register(IEndpointRouteBuilder app)
    {
        app.MapGet("/catalog", GetProducts);
        app.MapGet("/catalog/{id:length(24)}", GetProduct).WithName("GetProduct");
        app.MapGet("/catalog/byname/{name}", GetProductByName);
        app.MapGet("/catalog/bycategory/{category}", GetProductByCategory);
        app.MapPost("/catalog", CreateProduct);
        app.MapPut("/catalog/{id:length(24)}", UpdateProduct);
        app.MapDelete("/catalog/{id:length(24)}", DeleteProduct);
    }

    [ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
    private static async Task<IResult> GetProducts(
        [FromServices] IProductRepository repository)
    {
        return Results.Ok(await repository.GetProducts());
    }

    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    private static async Task<IResult> GetProduct(
        [FromRoute] string id,
        [FromServices] IProductRepository repository)
    {
        Entities.Product value = await repository.GetProduct(id);
        if (value == null)
            return Results.NotFound();
        return Results.Ok(value);
    }

    [ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
    private static async Task<IResult> GetProductByName(
        [FromRoute] string name,
        [FromServices] IProductRepository repository)
    {
        var value = await repository.GetProductsByName(name);
        return Results.Ok(value);
    }

    [ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
    private static async Task<IResult> GetProductByCategory(
        [FromRoute] string category,
        [FromServices] IProductRepository repository)
    {
        var value = await repository.GetProductsByCategory(category);
        return Results.Ok(value);
    }


    [ProducesResponseType(typeof(Product), StatusCodes.Status201Created)]
    private static async Task<IResult> CreateProduct(
        [FromBody] Product product,
        [FromServices] IProductRepository repository)
    {
        await repository.CreateProduct(product);
        return Results.CreatedAtRoute("GetProduct", new { product.Id }, product);
    }

    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    private static async Task<IResult> UpdateProduct(
        [FromRoute] string id,
        [FromBody] Product product,
        [FromServices] IProductRepository repository)
    {
        product.Id = id;
        await repository.UpdateProduct(product);
        return Results.Ok(product);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    private static async Task<IResult> DeleteProduct(
        [FromRoute] string id,
        [FromServices] IProductRepository repository)
    {
        await repository.DeleteProduct(id);
        return Results.Ok();
    }
}
