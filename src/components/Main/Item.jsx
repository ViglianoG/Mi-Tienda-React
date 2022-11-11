import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const Item = ({ prod }) => {
  return (
    <div className="card">
      <img src={prod.image} alt={prod.title} />
      <div className="card-info">
        <h2>{prod.title}</h2>
        <h4>${prod.price}</h4>
        <h5>#{prod.category}</h5>
        {prod.stock === 0 ? (
          <p>No hay stock de este producto</p>
        ) : (
          <Link className="fancy-button" to={`/item/${prod.id}`}>
            <FontAwesomeIcon style={{ color: "white" }} icon={faCartPlus} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Item;
