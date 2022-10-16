namespace Basket.Api.Entites
{
    public class ShoppingCart
    {
        public string UserName { get; set; } = "";

        public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();

        public decimal TotalPrice => Items.Sum(i => (i.Price - i.Discount) * i.Quantity);

    }
}
