import { FunctionComponent, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Product } from "../../Apis/CatalogClient";
import { useBasketFunctions } from "../../Services/BasketService";
import { ProductImage } from "../ProductImage/ProductImage";
import { ProductLink } from "../ProductLink/ProductLink";

interface ProductItemPartialProps {
  product: Product;
}

export const ProductItemPartial: FunctionComponent<ProductItemPartialProps> = ({ product, ...rest }) => {
  const { addProduct } = useBasketFunctions();
  const addProductHandler = useCallback(() => {
    addProduct(product, "Black", 1);
  }, [addProduct, product]);
  if (!product) return null;
  return (
    <>
      <div className="card">
        <ProductLink productId={product.id}>
          <ProductImage className="card-img-top" productImage={product.imageFile} alt="Product" />
        </ProductLink>
        <div className="card-body">
          <h4 className="card-title">
            <ProductLink productId={product.id} className="color-main">
              {product.name}
            </ProductLink>
          </h4>
          <p className="card-text">{product.summary}</p>
          <div className="row">
            <div className="col">
              <p className="btn btn-danger btn-block">{product.price}&nbsp;$</p>
            </div>
            <div className="col">
              <form asp-page-handler="AddToCart" method="post" name="addToCartForm" id="add_cart_form">
                <Button variant="success" className="btn-block" onClick={addProductHandler}>
                  Add to Cart
                </Button>
                <input type="hidden" asp-for="@Model.Id" name="productId" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
