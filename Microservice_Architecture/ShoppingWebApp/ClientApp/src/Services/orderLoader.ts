import { defer } from "react-router-dom";
import { orderingClient } from "../Apis";
import { getUser } from "./UserService";

export async function orderLoader() {
  const orders = orderingClient.orderAll(getUser());
  return defer({ orders });
}
