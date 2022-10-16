namespace OctelotApiGateway.Models;

public class ShoppingCartExt
{
    public string UserName { get; set; } = "";

    public List<ShoppingCartItemExt> Items { get; init; } = default!;

    public decimal TotalPrice { get; set; }

}
