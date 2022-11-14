import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, deleteAll, deleteOne, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="solo-cart">
        <h3>
          No tienes elementos en tu carrito, presiona{" "}
          <Link className="fancy-button" to="/">
            Volver
          </Link>{" "}
          para ir al inicio...
        </h3>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {cart.map((prod) => (
        <div key={prod.id} className="cart-detail">
          <img src={prod.image} alt={prod.title} />
          <div className="cart-detail-info">
            <h2>{prod.title}</h2>
            <h3>Cantidad: {prod.quantity}</h3>
            <h3>Precio: {prod.price}</h3>
            <h4>Subtotal: ${prod.price * prod.quantity}</h4>
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteOne(prod.id)}
            className="trash-button"
          ></FontAwesomeIcon>
        </div>
      ))}
      <h2>{`Total: $${totalPrice()}`}</h2>
      <button className="fancy-button" onClick={deleteAll}>
        Eliminar todo el carrito
      </button>
      <Link className="fancy-button" to="/checkout">
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
