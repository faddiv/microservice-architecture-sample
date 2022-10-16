import { FunctionComponent } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CheckoutBreadcrumb: FunctionComponent = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/cart" }}>
              Cart
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};
