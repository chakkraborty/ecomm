import "./App.css";
import AuthPage from "./components/AuthPage.js";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import CartPage from "./components/CartPage.js";
import Checkout from "./components/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
