using Catalog.API.Entities;

namespace Catalog.API.Data
{
    public interface IProductRepository
    {
        Task CreateProduct(Product product);
        Task<bool> DeleteProduct(string id);
        Task<Product> GetProduct(string id);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task<IEnumerable<Product>> GetProductsByName(string name);
        Task<bool> UpdateProduct(Product product);
    }
}