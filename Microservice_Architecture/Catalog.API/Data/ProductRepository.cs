using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data;

public class ProductRepository : IProductRepository
{
    private readonly ICatalogContext _catalogContext;

    public ProductRepository(ICatalogContext catalogContext)
    {
        _catalogContext = catalogContext;
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        return await _catalogContext
            .Products
            .Find(p => true)
            .ToListAsync();
    }

    public async Task<Product> GetProduct(string id)
    {
        return await _catalogContext
            .Products
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();

    }

    public async Task<IEnumerable<Product>> GetProductsByName(string name)
    {
        var filter = Builders<Product>.Filter
            .Eq(p => p.Name, name);
        return await _catalogContext
            .Products
            .Find(filter)
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsByCategory(string category)
    {
        var filter = Builders<Product>.Filter
            .Eq(p => p.Category, category);
        return await _catalogContext
            .Products
            .Find(filter)
            .ToListAsync();
    }

    public async Task CreateProduct(Product product)
    {
        await _catalogContext.Products.InsertOneAsync(product);
    }

    public async Task<bool> UpdateProduct(Product product)
    {
        var result = await _catalogContext.Products
            .ReplaceOneAsync(e => e.Id == product.Id, product);
        return result.IsAcknowledged && result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteProduct(string id)
    {
        var result = await _catalogContext.Products
            .DeleteOneAsync(e => e.Id == id);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }
}
