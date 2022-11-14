import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../services/firebaseConfig";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    const collectionProd = collection(dataBase, "products");
    const ref = category
      ? query(collectionProd, where("category", "==", category))
      : collectionProd;

    // const q = query(collectionProd, where('category', '==', category));

    getDocs(ref)
      .then((res) => {
        const products = res.docs.map((prod) => {
          return {
            id: prod.id,
            ...prod.data(),
          };
        });
        setItems(products);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => setLoading(true);
  }, [category]);

  if (loading) {
    return (
      <div className="loading-container">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    );
  }

  return (
    <main>
      <ItemList items={items} />
    </main>
  );
}

export default ItemListContainer;
