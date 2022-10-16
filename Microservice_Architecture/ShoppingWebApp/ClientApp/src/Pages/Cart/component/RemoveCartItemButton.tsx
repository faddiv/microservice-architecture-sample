import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useCallback } from "react";
import { ShoppingCartItem } from "../../../Apis/BasketClient";
import { useBasketFunctions } from "../../../Services/BasketService";

interface RemoveCartItemButtonProps {
  item: ShoppingCartItem;
}

export const RemoveCartItemButton: FunctionComponent<RemoveCartItemButtonProps> = ({ item, ...rest }) => {
  const { removeCartItem } = useBasketFunctions();
  const removeHandler = useCallback(() => {
    removeCartItem(item);
  }, [item, removeCartItem]);
  return (
    <button className="btn btn-sm btn-danger" onClick={removeHandler}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};
