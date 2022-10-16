using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Application.Features.CheckoutOrder;
using Ordering.API.Application.Features.DeleteOrder;
using Ordering.API.Application.Features.GetOrderList;
using Ordering.API.Application.Features.UpdateOrder;
using Ordering.API.Extensions;

namespace Ordering.API
{
    public static class OrderingApi
    {
        public static void Register(IEndpointRouteBuilder app)
        {
            app.MapPost("/order", ApiCreator.Create<CheckoutOrderCommand, string>())
                .Produces<int>(StatusCodes.Status200OK);
            app.MapDelete("/order", ApiCreator.Create<DeleteOrderCommand, Unit>())
                .Produces<Unit>(StatusCodes.Status200OK);
            app.MapPut("/order", ApiCreator.Create<UpdateOrderCommand, Unit>())
                .Produces<Unit>(StatusCodes.Status200OK);
            app.MapGet("/order/{userName}", async (
                string userName,
                [FromServices] IMediator mediator) =>
            {
                return Results.Ok(await mediator.Send(new GetOrderListQuery { UserName = userName }));
            })
                .Produces<List<OrderModel>>(StatusCodes.Status200OK);
        }
    }

}
