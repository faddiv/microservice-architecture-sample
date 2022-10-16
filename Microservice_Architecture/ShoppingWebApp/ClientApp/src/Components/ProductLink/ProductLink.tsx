import { FunctionComponent, memo, ReactNode, RefAttributes } from "react";
import { Product } from "../../Apis/CatalogClient";
import { Link, LinkProps, useSearchParams } from "react-router-dom";

interface ProductLinkProps extends Omit<LinkProps, "to">, RefAttributes<HTMLAnchorElement> {
  productId: Product["id"];
  children?: ReactNode;
}

export const ProductLink: FunctionComponent<ProductLinkProps> = memo(({ productId, ...rest }) => {
  const [query] = useSearchParams();
  const category = query.get("category");
  const link = category ? `/product/${productId}?category=${category}` : `/product/${productId}`;
  return <Link to={link} {...rest} />;
});
