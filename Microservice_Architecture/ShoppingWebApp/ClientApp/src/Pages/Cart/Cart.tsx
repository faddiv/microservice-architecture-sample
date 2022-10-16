import { FunctionComponent } from "react";
import { Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../Services/BasketService";
import { RemoveCartItemButton } from "./component/RemoveCartItemButton";

export const Cart: FunctionComponent = () => {
  const cart = useShoppingCart();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Cart</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Product</th>
                    <th scope="col">Available</th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-right">
                      Price
                    </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items?.map((i) => (
                    <tr>
                      <td>
                        <img src="https://dummyimage.com/50x50/55595c/fff" />
                      </td>
                      <td>{i.productName}</td>
                      <td>In stock</td>
                      <td>
                        <input className="form-control" type="text" value={i.quantity} />
                      </td>
                      <td className="text-right">{(i.quantity || 0) * (i.price || 0)} $</td>
                      <td className="text-right">
                        <RemoveCartItemButton item={i} />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>{cart.totalPrice} $</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col mb-2">
            <div className="row">
              <div className="col-sm-12  col-md-6">
                <Link to="/product" className="btn btn-success btn-lg btn-block">
                  Continue Shopping
                </Link>
              </div>
              <div className="col-sm-12 col-md-6 text-right">
                <Link to="/checkout" className="btn btn-lg btn-block btn-danger text-uppercase">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
