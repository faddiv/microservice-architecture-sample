using Discount.Grpc.Mappers;
using Discount.Grpc.Repositories;
using Discount.Grpc.Services;
using System.Data.Common;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
var services = builder.Services;
services.AddGrpc();
services.AddScoped<DbConnection, SqlConnection>(sp =>
{
    var conf = sp.GetRequiredService<IConfiguration>();
    return new SqlConnection(conf.GetConnectionString("DiscountDB"));
});
services.AddScoped<ICouponRepository, CouponRepository>();
services.AddScoped<ICouponMapper, CouponMapper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
