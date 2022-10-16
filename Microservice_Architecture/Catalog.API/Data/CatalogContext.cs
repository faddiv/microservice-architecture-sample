using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data;

public class CatalogContext : ICatalogContext
{
    public CatalogContext(IMongoClient client)
    {
        var catalogDB = client.GetDatabase("CatalogDB");
        Products = catalogDB.GetCollection<Product>("products");
        //CatalogContextSeed.SeedData(Products);
    }
    public IMongoCollection<Product> Products { get; }
}
