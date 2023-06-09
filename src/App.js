import Cart from "./pages/Cart";
import NavbarCmp from "./components/NavbarCmp";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import TablePage from "./pages/Table";
import UserDetail from "./pages/UserDetail";
import Store from "./pages/Store";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Hello from "./hello";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarCmp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/e-commerce" element={<Store />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/table" element={<TablePage />} />
          <Route exact path="/user/:userId" element={<UserDetail />} />
          <Route exact path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;





