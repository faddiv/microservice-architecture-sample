using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using OctelotApiGateway;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddLogging(opt =>
{
    opt.AddConsole();
});
services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var ocelot = builder.Configuration.GetSection("Ocelot");
services.AddOcelot(ocelot)
    //.AddSingletonDefinedAggregator<BasketAggregator>()
    ;
services.AddControllers();
services.AddSwaggerForOcelot(ocelot);

var app = builder.Build();

app.UseCors("CorsPolicy");
app.UseSwaggerForOcelotUI(opt =>
{
    opt.PathToSwaggerGenerator = "/swagger/docs";
});
await app.UseOcelot(opt =>
{

});

app.Run();
