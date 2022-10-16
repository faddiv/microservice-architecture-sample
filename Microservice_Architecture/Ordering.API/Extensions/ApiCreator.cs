using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Ordering.API.Extensions
{
    public static class ApiCreator
    {
        public static Func<TRequest, IMediator, CancellationToken, Task<IResult>> Create<TRequest, TResponse>()
            where TRequest : IRequest<TResponse>
        {
            return async (
                [FromBody] TRequest request,
                [FromServices] IMediator mediatr,
                CancellationToken token) =>
            {
                var response = await mediatr.Send(request, token);
                return Results.Ok(response);
            };
        }

        public static Func<TRequest, IMediator, CancellationToken, Task<IResult>> CreateGet<TRequest, TResponse>()
            where TRequest : IRequest<TResponse>
        {
            return async (
                [FromQuery] TRequest request,
                [FromServices] IMediator mediatr,
                CancellationToken token) =>
            {
                var response = await mediatr.Send(request, token);
                return Results.Ok(response);
            };
        }
    }
}
