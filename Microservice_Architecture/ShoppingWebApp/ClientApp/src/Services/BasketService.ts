import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { basketClient } from "../Apis";
import { BasketCheckout, ShoppingCart, ShoppingCartItem } from "../Apis/BasketClient";
import { Product } from "../Apis/CatalogClient";
import { getUser } from "./UserService";

export interface BasketModel {
  cart: ShoppingCart;
  version: number;
}

export const BasketContext = createContext<ReturnType<typeof useBasketProvider>>(null as any);

export function useBasketProvider() {
  const [basket, setBasket] = useState<BasketModel>(() => ({
    cart: {
      items: [],
      totalPrice: 0,
      userName: getUser(),
    },
    version: 0,
  }));
  const version = useRef(0);
  useEffect(() => {
    (async () => {
      const cart = await basketClient.basketGET(getUser());
      setBasket({ cart, version: 0 });
    })();
  }, []);
  const addProduct = useCallback(async (prod: Product, color: string, quantity: number) => {
    setBasket((basket) => {
      const item: ShoppingCartItem = {
        color: color,
        price: prod.price,
        productId: prod.id,
        productName: prod.name,
        quantity: quantity,
      };
      var cart: ShoppingCart = {
        ...basket.cart,
        items: upsert(
          basket.cart.items || [],
          item,
          (i) => i.productId === prod.id && i.color === color,
          (item, old) => {
            item.quantity = (item.quantity || 0) + (old.quantity || 0);
          }
        ),
      };
      return { version: basket.version + 1, cart };
    });
  }, []);

  const removeCartItem = useCallback(async (item: ShoppingCartItem) => {
    setBasket((basket) => {
      var cart: ShoppingCart = {
        ...basket.cart,
        items: basket.cart.items?.filter((i) => i !== item),
      };
      return { version: basket.version + 1, cart };
    });
  }, []);

  const checkout = useCallback(async (basket: BasketCheckout) => {
    await basketClient.checkout(basket);
    const cart = await basketClient.basketGET(getUser());
    version.current = 0;
    setBasket({ cart, version: 0 });
  }, []);

  useEffect(() => {
    (async () => {
      if (version.current < basket.version) {
        const newVersion = basket.version;
        version.current = newVersion;
        setBasket({ ...basket, version: newVersion });
        const newCart = await basketClient.basketPOST(basket.cart);
        setBasket({ version: newVersion, cart: newCart });
      }
    })();
  }, [basket]);

  return {
    cart: basket.cart,
    addProduct,
    removeCartItem,
    checkout,
  };
}
export function useBasketContext() {
  return useContext(BasketContext);
}
export function useShoppingCart() {
  const basket = useBasketContext();
  return basket.cart;
}
export function useShoppingCartQuantity() {
  const basket = useBasketContext();
  return getShpooingCartQuantity(basket.cart);
}
export function getShpooingCartQuantity(cart: ShoppingCart) {
  return cart.items?.reduce((prev, curr) => prev + (curr.quantity || 0), 0);
}
export function useBasketFunctions() {
  const basket = useBasketContext();
  return {
    addProduct: basket.addProduct,
    removeCartItem: basket.removeCartItem,
    checkout: basket.checkout,
  };
}

function upsert<T>(array: T[], newItem: T, func: (item: T) => boolean, transform: (newItem: T, oldItem: T) => void) {
  const newArray = [...array];
  let notFound = true;
  for (let index = 0; index < array.length; index++) {
    if (func(array[index])) {
      transform(newItem, newArray[index]);
      newArray[index] = newItem;
      notFound = false;
      break;
    }
  }
  if (notFound) {
    newArray.push(newItem);
  }
  return newArray;
}
