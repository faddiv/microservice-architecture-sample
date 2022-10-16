using Basket.Api.Mappers;
using Basket.Api.Repositories;
using Basket.API;
using EventBus.Messages;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var redisDb = builder.Configuration.GetConnectionString("redisdb");
services.AddStackExchangeRedisCache((options) =>
{
    options.Configuration = redisDb;
});
services.AddGrpcClient<Discount.Grpc.DiscountGrpc.DiscountGrpcClient>((sp, opt) =>
{
    var cfg = sp.GetRequiredService<IConfiguration>();
    opt.Address = new Uri(cfg.GetConnectionString("DiscountApi"));
});
services.AddScoped<IDiscountService, DiscountGrpcService>();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddScoped<IBasketRepository, BasketRepository>();
services.AddMapperWithImplementation<IBasketMapper>();
services.AddMassTransit((opt) =>
{
    opt.UsingRabbitMq((ctx, optRmq) =>
    {
        var configuration = ctx.GetRequiredService<IConfiguration>();
        optRmq.Host(configuration.GetConnectionString("rabbitmq"));
    });
}).AddMassTransitHostedService();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();


BasketApi.Register(app);

app.Run();
