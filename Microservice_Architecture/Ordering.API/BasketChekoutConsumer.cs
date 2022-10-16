using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using Ordering.API.Mappers;

namespace Ordering.API;

public class BasketChekoutConsumer : IConsumer<BasketCheckoutEvent>
{
    private readonly ILogger<BasketChekoutConsumer> _logger;
    private readonly IMediator _mediator;
    private readonly IOrderMapper _mapper;

    public BasketChekoutConsumer(
        ILogger<BasketChekoutConsumer> logger,
        IMediator mediator,
        IOrderMapper mapper)
    {
        _logger = logger;
        _mediator = mediator;
        _mapper = mapper;
        _logger.LogDebug("ctor called");
    }
    public async Task Consume(ConsumeContext<BasketCheckoutEvent> context)
    {
        using var loggerSccope = _logger.BeginScope("CorrelationId: {CorrelationId}", context.CorrelationId);
        var command = _mapper.MapToCheckoutOrderCommand(context.Message);
        await _mediator.Send(command, context.CancellationToken);
        _logger.LogInformation("Basket checked out: {UserName}", command.UserName);
    }
}
