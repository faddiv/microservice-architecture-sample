import { faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { catalogClient } from "../../Apis";
import { Product } from "../../Apis/CatalogClient";
import { ProductItemPartial } from "../../Components/ProductItemPartial/ProductPartial";
import { IndexCarosuel } from "./components/IndexCarosuel";
import { TopProductPartial } from "./components/TopProductPartial";

export const Index: FunctionComponent = () => {
  const [products,,] = useLoaderData() as [Product[], string[], string];
  return (
    <>
      <hr />

      <div className="container">
        <div className="row">
          <div className="col">
            <IndexCarosuel />
          </div>

          <TopProductPartial product={products[0]} />
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-sm">
            <div className="card">
              <div className="card-header bg-primary text-white text-uppercase">
                <FontAwesomeIcon icon={faStar} /> Last products
              </div>
              <div className="card-body">
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-sm">
                      <ProductItemPartial product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3 mb-4">
        <div className="row">
          <div className="col-sm">
            <div className="card">
              <div className="card-header bg-primary text-white text-uppercase">
                <FontAwesomeIcon icon={faTrophy} /> Best products
              </div>
              <div className="card-body">
                <div className="row">
                  {products
                    .filter((_, i) => i < 4)
                    .map((product) => (
                      <div key={product.id} className="col-sm">
                        <ProductItemPartial product={product} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
