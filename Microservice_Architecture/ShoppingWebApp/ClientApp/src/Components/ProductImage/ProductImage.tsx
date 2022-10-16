import { FunctionComponent, ImgHTMLAttributes, memo } from "react";

interface ProductImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  productImage: string | undefined;
}

export const ProductImage: FunctionComponent<ProductImageProps> = memo(({ productImage, alt, ...rest }) => {
  if (productImage) {
    return <img src={`/images/product/${productImage}`} alt={alt || "Product"} {...rest} />;
  } else {
    return <div>No image</div>;
  }
});
