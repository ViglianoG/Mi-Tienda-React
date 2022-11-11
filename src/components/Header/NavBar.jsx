import CartWidget from "./CartWidget";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { dataBase } from "../../services/firebaseConfig";
import { useState } from "react";

function NavBar() {
 const [categories, setCategories] = useState([])
  useEffect(()=>{
    const collectionCat = collection(dataBase, 'category')
    getDocs(collectionCat)
    .then((res)=>{
      const categories = res.docs.map((cat)=>{
        return{
          id: cat.id,
          ...cat.data()
        }
      })
      setCategories(categories)
    })
    .catch((e)=>{
      console.log(e)
    })
  }, [])

  return (
    <nav className="app-header">
      <Link to="/">
        <h1>Mi tienda</h1>
      </Link>
      <div>
        {
          categories.map((cat)=>(
            <NavLink key={cat.id} to={`/category/${cat.path}`}>{cat.name}</NavLink>
          ))
        }
        <NavLink to="/cart"><CartWidget /></NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
