import { LoaderFunctionArgs } from "react-router-dom";
import { catalogClient } from "../Apis";
import { Product } from "../Apis/CatalogClient";

function collectCategories(products: Product[]) {
  const values = new Set(products.map((p) => p.category));
  const list: string[] = [];
  values.forEach((item) => {
    if (item) list.push(item);
  });
  return list;
}

export async function catalogLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const products = await catalogClient.catalogAll();
  const filteredProducts = category ? products.filter((p) => p.category === category) : products;
  const categories = collectCategories(products);
  return [filteredProducts, categories, category];
}
