import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function CartWidget() {
  const { totalQuantity } = useContext(CartContext);


  return (
    <>
      <FontAwesomeIcon
        style={{ color: "black" }}
        icon={faCartShopping}
      />
      {<span>{totalQuantity()}</span>}
    </>
  );
}

export default CartWidget;
