import { createContext, useState } from "react";

export const CartContext = createContext();

const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const product = { ...item, quantity };
    if (isInCart(product.id)) {
      addQuantity(product);
    } else {
      setCart([...cart, product]);
    }
  };

  const isInCart = (id) => cart.some((prod) => prod.id === id);

  const deleteAll = () => setCart([]);

  const addQuantity = (addedProd) => {
    const updatedCart = cart.map((cartProd) => {
      if (cartProd.id === addedProd.id) {
        const updatedProd = {
          ...cartProd,
          quantity: addedProd.quantity,
        };
        return updatedProd;
      } else {
        return cartProd;
      }
    });
    setCart(updatedCart);
  };

  const deleteOne = (id) => {
    const filteredProd = cart.filter((prod) => prod.id !== id);
    setCart(filteredProd);
  };

  const totalQuantity = () => {
    let number = 0;
    const copy = [...cart];
    copy.forEach((prod) => {
      number = number + prod.quantity;
    });
    return number;
  };

  const totalPrice = () => {
    let number = 0;
    const copy = [...cart];
    copy.forEach((prod) => {
      number += prod.price * prod.quantity;
    });
    return number;
  };

  const getQuantity = (id) => {
    const product = cart.find((prod) => prod.id === id);
    return product?.quantity;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteAll,
        deleteOne,
        totalQuantity,
        getQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default Provider;
