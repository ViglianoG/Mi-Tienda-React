import "./App.css";
import NavBar from "./components/Header/NavBar";
import ItemListContainer from "./components/Main/ItemListContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/Main/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import Form from "./components/Form/Form";
import Provider from "./components/Context/CartContext";



function App() {
  return (
    <Provider>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Form />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
