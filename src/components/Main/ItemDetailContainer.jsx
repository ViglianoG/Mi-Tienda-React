import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { dataBase } from "../../services/firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionProd = collection(dataBase, "products");
    const ref = doc(collectionProd, id);
    getDoc(ref)
      .then((res) => {
        setItem({
          id: res.id,
          ...res.data(),
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
    <div className="item-detail-container">
      <ItemDetail item={item} />
    </div>
  );
}

export default ItemDetailContainer;
