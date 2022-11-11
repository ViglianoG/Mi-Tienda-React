import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../Context/CartContext";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { dataBase } from "../../services/firebaseConfig";
import { Link } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idBuy, setIdBuy] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");

  const { cart, totalPrice, deleteAll } = useContext(CartContext);

  const buyerEmail = () => {
    if (email === email2) {
      let realEmail = email;
      return realEmail;
    }
  };

  const realEmail = buyerEmail();

  const submit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const order = {
        buyer: { name, lastName, realEmail },
        items: cart,
        total: totalPrice(),
        date: serverTimestamp(),
      };

      const ids = cart.map((prod) => prod.id);

      const productsCollection = collection(dataBase, "products");

      const productsFromFS = await getDocs(
        query(productsCollection, where(documentId(), "in", ids))
      );

      const { docs } = productsFromFS;

      const outOfStock = [];

      const batch = writeBatch(dataBase);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const dataBaseStock = dataDoc.stock;
        const addedProduct = cart.find((prod) => prod.id === doc.id);
        const prodQuantity = addedProduct?.quantity;

        if (dataBaseStock >= prodQuantity) {
          batch.update(doc.ref, { stock: dataBaseStock - prodQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        batch.commit();
        const orderRef = collection(dataBase, "orders");
        const orderAdd = await addDoc(orderRef, order);
        setIdBuy(orderAdd.id);
        deleteAll();
      } else {
        alert("No hay stock de algun producto...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeEmail2 = (event) => {
    setEmail2(event.target.value);
  };

  if (idBuy) {
    return (
      <div className="ty-message">
        <h1>{`Gracias por tu compra, tu ID de compra es: (${idBuy})`}</h1>
        <h2>
          Presiona <Link to="/"> AQUI </Link> para volver al inicio.
        </h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {cart.map((prod) => (
        <div key={prod.id} className="cart-detail">
          <img src={prod.image} alt={prod.title} />
          <div className="cart-detail-info">
            <h5>{prod.title}</h5>
            <p>Cantidad: {prod.quantity}</p>
            <p>Precio: {prod.price}</p>
            <p>Subtotal: ${prod.price * prod.quantity}</p>
          </div>
        </div>
      ))}
      <h2>{`Total: $${totalPrice()}`}</h2>

      <div className="form-container">
        <form onSubmit={submit} action="">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre..."
            onChange={changeName}
            value={name}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido..."
            onChange={changeLastName}
            value={lastName}
          />
          <input
            type="text"
            name="email"
            placeholder="ejemplo@ejemplo"
            onChange={changeEmail}
            value={email}
          />
          <input
            type="text"
            name="email"
            placeholder="ejemplo@ejemplo"
            onChange={changeEmail2}
            value={email2}
          />
          {email === email2 ? (
            <button className="fancy-button">
              {loading ? "Enviando " : "Enviar"}
            </button>
          ) : (
            <p className="fancy-button">Los Emails no coinciden</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
