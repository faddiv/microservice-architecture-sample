using Discount.API;
using Discount.API.Entities;
using Discount.API.Mappers;
using Discount.API.Repositories;
using Discount.API.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var services = builder.Services;
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddSingleton<IMongoClient>((sp) =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var connectionString = config.GetConnectionString("DiscountDB");
    var client = new MongoClient(connectionString);
    return client;
});
services.AddScoped<IDiscountContext, DiscountContext>();
services.AddScoped<ICouponRepository, CouponRepository>();
services.AddScoped<ICouponMapper, CouponMapper>();
services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.MapGrpcService<GreeterService>();
DiscountApi.Register(app);
/*using (var v = app.Services.CreateScope()) {
    var repo = v.ServiceProvider.GetRequiredService<ICouponRepository>();
    repo.CreateCoupon(new Coupon
    {
        ProductName = "IPhone X",
        Amount = 150,
        Description = "IPhone X 150"
    });
    repo.CreateCoupon(new Coupon
    {
        ProductName = "Samsung 10",
        Amount = 120,
        Description = "Samsung 10 120"
    });
    repo.CreateCoupon(new Coupon
    {
        ProductName = "Huawei Plus",
        Amount = 100,
        Description = "Huawei Plus 100"
    });
}*/
app.Run();
