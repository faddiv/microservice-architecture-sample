import {
  faCreditCard,
  faFileText,
  faMinus,
  faPhone,
  faPlus,
  faShoppingCart,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { catalogClient } from "../../Apis";
import { Product } from "../../Apis/CatalogClient";
import { ProductImage } from "../../Components/ProductImage/ProductImage";
import { SiteBreadcrumb } from "../../Components/SiteBreadcrumb/SiteBreadcrumb";
import { useBasketFunctions } from "../../Services/BasketService";

interface ProductForm {
  quantity: number;
  color: string;
}

export const ProductDetail: FunctionComponent = () => {
  const { addProduct } = useBasketFunctions();
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  useEffect(() => {
    (async () => {
      if (!productId) return;
      const prod = await catalogClient.getProduct(productId);
      setProduct(prod);
    })();
  }, [productId]);
  const [query] = useSearchParams();
  const category = query.get("category");
  const { register, handleSubmit, setValue, getValues, reset } = useForm<ProductForm>({
    defaultValues: {
      quantity: 1,
      color: "Black",
    },
    mode: "onSubmit",
  });
  const onSubmit = async (data: ProductForm) => {
    if (!product) {
      return;
    }
    const prod = product;
    addProduct(prod, data.color, data.quantity);
    reset();
  };
  const minusHandler = useCallback(() => {
    const quantity = getValues("quantity");
    setValue("quantity", quantity - 1);
  }, [getValues, setValue]);
  const plusHandler = useCallback(() => {
    const quantity = getValues("quantity");
    setValue("quantity", quantity + 1);
  }, [getValues, setValue]);

  if (!product) return null;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <SiteBreadcrumb product={product.name} category={category} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <ProductImage productImage={product.imageFile} className="img-fluid" />
                <p className="text-center">{product.name}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 add_to_cart_block">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <p className="price">{product.price} $</p>
                <p className="price_discounted">{(product.price || 0) + 120} $</p>
                <form onSubmit={handleSubmit(onSubmit)} name="addToCartForm" id="add_cart_form">
                  <div className="form-group">
                    <label htmlFor="colors">Color</label>
                    <select {...register("color", { required: "Color is required" })} className="form-select" id="colors">
                      <option value="Black">Black</option>
                      <option value="Blue">Blue</option>
                      <option value="Red">Red</option>
                      <option value="Green">Green</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity :</label>
                    <InputGroup className="mb-3">
                      <Button variant="danger" type="button" className="quantity-left-minus btn-number" onClick={minusHandler}>
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <input
                        {...register("quantity", {
                          min: { value: 1, message: "Min is 1" },
                          max: { value: 100, message: "Max is 100" },
                          valueAsNumber: true,
                        })}
                        type="text"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                      />
                      <Button variant="success" type="button" className="quantity-right-plus btn-number" onClick={plusHandler}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </InputGroup>
                  </div>
                  <button type="submit" className="btn btn-success btn-lg btn-block text-uppercase">
                    <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                  </button>
                </form>
                <div className="product_rassurance">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <FontAwesomeIcon icon={faTruck} size="2x" />
                      <br />
                      Fast delivery
                    </li>
                    <li className="list-inline-item">
                      <FontAwesomeIcon icon={faCreditCard} size="2x" />
                      <br />
                      Secure payment
                    </li>
                    <li className="list-inline-item">
                      <FontAwesomeIcon icon={faPhone} size="2x" />
                      <br />
                      +33 1 22 54 65 60
                    </li>
                  </ul>
                </div>
                <div className="reviews_product p-3 mb-2 ">
                  3 reviews
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  (4/5)
                  <a className="pull-right" href="#reviews">
                    View all reviews
                  </a>
                </div>
                <div className="datasheet p-3 mb-2 bg-info text-white">
                  <a href="/data" className="text-white">
                    <FontAwesomeIcon icon={faFileText} /> Download DataSheet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card border-light mb-3">
              <div className="card-header bg-primary text-white text-uppercase">
                <i className="fa fa-align-justify"></i> Description
              </div>
              <div className="card-body">
                <p className="card-text">{product.summary}</p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
