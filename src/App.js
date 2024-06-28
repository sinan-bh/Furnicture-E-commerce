import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Registration-Login/Login";
import Registration from "./components/Registration-Login/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NavBar from "./components/Home/NavBar";
import Collections from "./components/categories/Collections";
import AddCart from "./components/Cart/AddCart";
import  CartContext  from "./components/context/CartContext";

function App() {
  return (
    <div className="App">
      <CartContext>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/allproducts">
          <Route index element={<Collections type='All'/>} />
          <Route path="livingroom" element={<Collections type="Living Room Furniture" />} />
          <Route path="diningset" element={<Collections type="Dining Room Furniture" />} />
          <Route path="bedroom" element={<Collections type="Bedroom Furniture" />} />
        </Route>
        <Route path="/addcart" element={<AddCart />} />

      </Routes>
      {/* <Footer /> */}
      </CartContext>
    </div>
  );
}

export default App;
