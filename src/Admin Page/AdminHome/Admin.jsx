import React from "react";
import NavBarAdmin from "../component/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../component/Home/AdminHome";
import UserDatas from "../component/Home/Users/UserDatas";
import Products from "../component/Home/Products/Products";
import AdminContext from "../../context/AdminContext";
import AddEditProduct from "../component/Edit&AddProduct/AddEditProduct";
import OrderDetails from "../component/Home/OrderDetails/OrderDetails";
import '../component/Home/admin.css'
import Logo from "../../assets/img/logo/logo.png";
import ProtectedRoute from "./ProtectedAdmin";

function Admin() {

  return (
    <div className="body-admin">
      <div className=" card-Header ">
        <img src={Logo} alt="" />
      </div>
      <div className="">
      <AdminContext>
        <NavBarAdmin />
        <Routes>
        <Route path="/adminhome/*" element={<ProtectedRoute element={<AdminHome />} />} />
          <Route path="/adminhome/userdatas"element={<ProtectedRoute element={<UserDatas />} />} />
          <Route path="/adminhome/order" element={<ProtectedRoute element={<OrderDetails />} />} />
          <Route path="/adminhome/product-details"  >
            <Route index element={<ProtectedRoute element={<Products type='All' />} />}/>
            <Route path="product-lvingroom" element={<Products type='livingroom' />} />
            <Route path="product-diningset" element={<Products type='diningroom' />} />
            <Route path="product-bedroom" element={<Products type='bedroom' />} /> 
          </Route>
          <Route path="/adminhome/add-edit-product" element={<ProtectedRoute element={<AddEditProduct />} />} />
          <Route path="/adminhome/add-edit-product/:id" element={<ProtectedRoute element={<AddEditProduct />} />} />
        </Routes>
      </AdminContext>
      </div>
    </div>
  );
}

export default Admin;
