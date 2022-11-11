import React, { useState } from "react";

const ItemCount = ({stock, initial =1, onAdd}) => {
  const [count, setCount] = useState(initial);

  const sumar = () => {
    count < stock && setCount(count + 1);
  };

  const restar = () => {
    count > 1 && setCount(count - 1);
  };

  return (
    <div className="container-count">
      <div className="count-btn">
        <button className="fancy-button" disabled={count === 1} onClick={restar}>
          -
        </button>
        <p>{count}</p>
        <button className="fancy-button" disabled={count === stock} onClick={sumar}>
          +
        </button>
      </div>
      <button  onClick={()=> onAdd(count)} className="fancy-button add-btn">Agregar al carrito</button>
    </div>
  );
};

export default ItemCount;
