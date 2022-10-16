import { FunctionComponent } from "react";
import { Breadcrumb, Card, ListGroup } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../../Apis/CatalogClient";
import { ProductImage } from "../../Components/ProductImage/ProductImage";
import { ProductItemPartial } from "../../Components/ProductItemPartial/ProductPartial";

export const ProductPage: FunctionComponent = () => {
  const [filteredProducts, categories, category] = useLoaderData() as [Product[], string[], string];
  const firstProduct = filteredProducts.length ? filteredProducts[0] : null;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/product" }} active={!category}>
                Category
              </Breadcrumb.Item>
              {category && <Breadcrumb.Item active>{category}</Breadcrumb.Item>}
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-3">
            <Card bg="light" className="mb-3">
              <Card.Header className="bg-primary text-white text-uppercase">
                <i className="fa fa-list"></i> Categories
              </Card.Header>
              <ListGroup className="category_block" variant="flush">
                {categories.map((category) => (
                  <ListGroup.Item key={category}>
                    <Link to={`/product?category=${category}`}>{category}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
            {firstProduct ? (
              <Card bg="light" className="mb-3">
                <Card.Header className="bg-success text-white text-uppercase">Last product</Card.Header>
                <Card.Body>
                  <ProductImage productImage={firstProduct?.imageFile} className="img-fluid" />
                  <Card.Title as="h5">{firstProduct?.name}</Card.Title>
                  <Card.Text>{firstProduct?.summary}</Card.Text>
                  <p className="bloc_left_price">{firstProduct?.price} $</p>
                </Card.Body>
              </Card>
            ) : null}
          </div>

          <div className="col">
            <div className="row">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <ProductItemPartial product={product} />
                </div>
              ))}
              <div className="col-12">
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={1}>
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
