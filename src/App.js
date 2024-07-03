import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Registration-Login/Login";
import Registration from "./Pages/Registration-Login/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import NavBar from "./components/NavBar-Footer/NavBar";
import Collections from "./components/Products/Products";
import AddCart from "./components/Cart/AddCart";
import CartContext from "./components/context/CartContext";
import Payment from "./components/Paymet/Payment";
import Footer from "./components/NavBar-Footer/Footer";
import SearchItem from "./components/Home/SearchItem";
import ProductDetails from "./components/Products/ProductDetails";

function App() {
  return (
    <div className="App">
      <CartContext>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts">
            <Route index element={<Collections type="All" />} />
            <Route
              path="livingroom"
              element={<Collections type="Living Room Furniture" />}
            />
            <Route
              path="diningset"
              element={<Collections type="Dining Room Furniture" />}
            />
            <Route
              path="bedroom"
              element={<Collections type="Bedroom Furniture" />}
            />
            <Route path="/allproducts:productID" element={<ProductDetails />} />
          </Route>
          <Route path="/addcart" element={<AddCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/searchItem" element={<SearchItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <Footer />
      </CartContext>
    </div>
  );
}

export default App;
