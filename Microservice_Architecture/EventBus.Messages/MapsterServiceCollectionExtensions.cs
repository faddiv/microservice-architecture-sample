using Microsoft.Extensions.DependencyInjection;

namespace EventBus.Messages
{
    public static class MapsterServiceCollectionExtensions
    {
        public static IServiceCollection AddMapperWithImplementation<TInterface>(this IServiceCollection services)
        {
            Type tInterface = typeof(TInterface);
            var assembly = tInterface.Assembly;
            var className = tInterface.Name.Substring(1);
            var namesapceName = tInterface.Namespace;
            string fullName = $"{namesapceName}.{className}";
            var implementationType = assembly.GetType(fullName);
            if (implementationType is null)
            {
                throw new Exception($"{fullName} not found");
            }
            services.AddSingleton(tInterface, implementationType);
            return services;
        }
    }
}
