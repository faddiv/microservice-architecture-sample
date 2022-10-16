using MediatR;
using Ordering.API;
using Ordering.API.Application.Behaviors;
using Ordering.API.Application.Contracts.Emails;
using Ordering.API.Application.Contracts.Persistence;
using FluentValidation;
using Ordering.API.Mappers;
using Ordering.API.Infrastructure;
using Ordering.API.Infrastructure.Persistence;
using EventBus.Messages;
using MassTransit;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var services = builder.Services;
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddMediatR(OrderingApiRoot.Assembly);
services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

services.AddMapperWithImplementation<IOrderMapper>();

services.AddValidatorsFromAssembly(OrderingApiRoot.Assembly);
services.AddScoped<IOrderRepository, OrderRepository>();
services.AddScoped<IEmailService, EmailService>();
services.AddSingleton<IMongoClient>((sp) =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var connectionString = config.GetConnectionString("Ordering");
    var client = new MongoClient(connectionString);
    return client;
});
services.AddScoped<IOrderingContext, OrderingContext>();
services.AddMassTransit((opt) =>
{
    opt.UsingRabbitMq((ctx, optRmq) =>
    {
        var configuration = ctx.GetRequiredService<IConfiguration>();
        optRmq.Host(configuration.GetConnectionString("rabbitmq"));

        optRmq.ReceiveEndpoint(EventBusConstants.BasketCheckoutTopic, optEp =>
        {
            optEp.ConfigureConsumer<BasketChekoutConsumer>(ctx);
        });
    });

    opt.AddConsumer<BasketChekoutConsumer>();

}).AddMassTransitHostedService();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
OrderingApi.Register(app);
 
app.Run();
