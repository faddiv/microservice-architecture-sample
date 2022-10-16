import { FunctionComponent } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface SiteBreadcrumbPathElement {}

interface SiteBreadcrumbProps {
  category?: string | null;
  product?: string;
}

export const SiteBreadcrumb: FunctionComponent<SiteBreadcrumbProps> = ({ category, product }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/product" }} active={!category && !product}>
        Category
      </Breadcrumb.Item>
      {category && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/product?category=${category}` }} active={!product}>
          {category}
        </Breadcrumb.Item>
      )}
      {product && <Breadcrumb.Item active>{product}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};
