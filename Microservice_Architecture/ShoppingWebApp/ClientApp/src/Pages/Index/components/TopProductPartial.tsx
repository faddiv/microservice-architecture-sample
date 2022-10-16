import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Product } from "../../../Apis/CatalogClient";
import { ProductImage } from "../../../Components/ProductImage/ProductImage";
import { ProductLink } from "../../../Components/ProductLink/ProductLink";

interface TopProductPartialProps {
  product: Product;
}

export const TopProductPartial: FunctionComponent<TopProductPartialProps> = ({ product }) => {
  if (!product) {
    return null;
  }
  return (
    <>
      <div className="col-12 col-md-3">
        <div className="card">
          <div className="card-header bg-success text-white text-uppercase">
            <FontAwesomeIcon icon={faHeart} /> Top product
          </div>
          <ProductLink productId={product.id}>
            <ProductImage className="img-fluid border-0" productImage={product.imageFile} alt="Card cap" />
          </ProductLink>
          <div className="card-body">
            <h4 className="card-title text-center">
              <ProductLink productId={product.id} title="View Product">
                {product.name}
              </ProductLink>
            </h4>
            <div className="row">
              <div className="col">
                <p className="btn btn-danger btn-block">{product.price} $</p>
              </div>
              <div className="col">
                <ProductLink productId={product.id} title="View Product" className="btn btn-success btn-block">
                  View
                </ProductLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
