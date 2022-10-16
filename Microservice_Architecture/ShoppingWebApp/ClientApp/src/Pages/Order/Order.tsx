import { FunctionComponent, Suspense } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Await, Link, useFetcher, useLoaderData } from "react-router-dom";
import { OrderModel } from "../../Apis/OrderingClient";
import styles from "./Order.module.scss";

export const Order: FunctionComponent = () => {
  const data = useLoaderData() as { orders: Promise<OrderModel[]> };
  const fetcher = useFetcher();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Order
                </li>
              </ol>
            </nav>
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
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col" className="text-right">
                      TotalPrice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Suspense
                    fallback={
                      <tr>
                        <td colSpan={6}>
                          <div className={styles.loader}>
                            <span>
                              <Spinner animation="border" /> Loading
                            </span>
                          </div>
                        </td>
                      </tr>
                    }
                  >
                    <Await resolve={data.orders} errorElement={<tr>Error</tr>}>
                      {(orders: OrderModel[]) => (
                        <>
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td>
                                <img src="https://dummyimage.com/50x50/55595c/fff" />
                              </td>
                              <td>{order.firstName}</td>
                              <td>{order.lastName}</td>
                              <td>{order.emailAddress}</td>
                              <td>{order.addressLine}</td>
                              <td className="text-right">{order.totalPrice} $</td>
                            </tr>
                          ))}
                        </>
                      )}
                    </Await>
                  </Suspense>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col mb-2">
            <div className="row">
              <div className="col-sm-12  col-md-6">
                <Link to="/product" className="btn btn-lg btn-block btn-success">
                  Continue Shopping
                </Link>
                <Button
                  variant="primary"
                  onClick={() => {
                    const url = new URL(window.location.href);
                    fetcher.load(url.pathname);
                  }}
                >
                  Reload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
