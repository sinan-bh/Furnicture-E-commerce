import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./User Pages/Registration-Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./User Pages/Home/Home";
import NavBar from "../src/User Pages/component/NavBar-Footer/NavBar";
import Collections from "../src/User Pages/component/Products/Products";
import AddCart from "../src/User Pages/component/Cart/AddCart";
import Payment from "../src/User Pages/component/Paymet/Payment";
import Footer from "../src/User Pages/component/NavBar-Footer/Footer";
import SearchItem from "../src/User Pages/component/Home/SearchItem";
import ProductDetails from "../src/User Pages/component/Products/ProductDetails";
import Admin from "./Admin Page/AdminHome/Admin";
import CartContext from "./context/CartContext";
import Registration from "./User Pages/Registration-Login/Registration";

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.includes("/adminhome");

  return (
    <div className="App">
      <CartContext>
        {!hideNavAndFooter ? (
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/allproducts">
                <Route index element={<Collections type="All" />} />
                <Route
                  path="livingroom"
                  element={<Collections type="livingroom" />}
                />
                <Route
                  path="diningset"
                  element={<Collections type="diningroom" />}
                />
                <Route
                  path="bedroom"
                  element={<Collections type="bedroom" />}
                />
                <Route
                  path="/allproducts:productID"
                  element={<ProductDetails />}
                />
              </Route>
              <Route path="/addcart" element={<AddCart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/searchItem" element={<SearchItem />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
            <Footer />
          </div>
        ) : (
          <div>
            <Admin />
          </div>
        )}
      </CartContext>
    </div>
  );
}

export default App;
