import { BasketClient } from "./BasketClient";
import { CatalogClient } from "./CatalogClient";
import { OrderClient } from "./OrderingClient";

const octelotUrl = "https://localhost:5011";

export const basketClient = new BasketClient(octelotUrl);
export const catalogClient = new CatalogClient(octelotUrl);
export const orderingClient = new OrderClient(octelotUrl);
