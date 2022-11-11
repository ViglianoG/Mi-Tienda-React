import ItemCount from "./ItemCount";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const ItemDetail = ({ item }) => {
  const [unidades, setUnidades] = useState(0);

  const { addToCart, getQuantity } = useContext(CartContext);

  const quantity = getQuantity(item.id);

  const onAdd = (quantity) => {
    setUnidades(quantity);
    addToCart(item, quantity);
  };

  return (
    <div className="item-detail-info">
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <h4>${item.price}</h4>
        <h5>#{item.category}</h5>
      </div>
      {unidades === 0 ? (
        item.stock === 0 ? (
          <h1>No hay stock de este producto</h1>
        ) : (
          <ItemCount onAdd={onAdd} stock={item.stock} initial={quantity} />
        )
      ) : (
        <Link
          className="fancy-button"
          style={{
            width: "15%",
            height: "60px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          to="/cart"
        >
          Ir al carrito
        </Link>
      )}
      {
        <h2>
          {unidades === 0
            ? `Agrega más unidades de este producto en tu carrito`
            : `Hay ${quantity} unidades de este producto en tu carrito`}
        </h2>
      }
    </div>
  );
};

export default ItemDetail;
