import { FunctionComponent } from "react";
import { Badge, Col, ListGroup } from "react-bootstrap";
import { ShoppingCartItem } from "../../../Apis/BasketClient";
import { getShpooingCartQuantity, useShoppingCart } from "../../../Services/BasketService";

export const CheckoutCart: FunctionComponent = () => {
  const cart = useShoppingCart();
  const quantity = getShpooingCartQuantity(cart);
  return (
    <Col md={{ span: 4, order: 2 }} className="mb4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <Badge pill bg="secondary">
          {quantity}
        </Badge>
      </h4>
      <ListGroup className="mb-3">
        {cart.items?.map((item) => (
          <ListGroup.Item key={`${item.productId}${item.color}`} className="d-flex justify-content-between">
            <div>
              <h6 className="my-0">{item.productName}</h6>
              <small className="text-muted">
                {item.quantity}*{productPrice(item)}
              </small>
            </div>
            <span className="text-muted">${itemPrice(item)}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>${cart.totalPrice}</strong>
        </ListGroup.Item>
      </ListGroup>

      <form className="card p-2">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Promo code" />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">
              Redeem
            </button>
          </div>
        </div>
      </form>
    </Col>
  );
};

function itemPrice(item: ShoppingCartItem) {
  return productPrice(item) * (item.quantity || 0);
}

function productPrice(item: ShoppingCartItem) {
  return (item.price || 0) - (item.discount || 0);
}
