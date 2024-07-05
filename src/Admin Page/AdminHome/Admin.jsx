import React from "react";
import NavBarAdmin from "../component/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../component/Home/AdminHome";
import UserDatas from "../component/Home/UserDatas";
import Products from "../component/Home/Products";
import AdminContext from "../../context/AdminContext";
import AddEditProduct from "../component/Edit&AddProduct/AddEditProduct";

function Admin() {
  return (
    <div className="">
      <h1 className="d-flex justify-content-center mt-5">
        Welcome To Admin Page
      </h1>
      <AdminContext>
        <NavBarAdmin />
        <Routes>
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/admin/userdatas" element={<UserDatas />} />
          <Route path="/admin/product-details"  >
            <Route index element={<Products type='All' />} />
            <Route path="product-lvingroom" element={<Products type='Living Room Furniture' />} />
            <Route path="product-diningset" element={<Products type='Dining Room Furniture' />} />
            <Route path="product-bedroom" element={<Products type='Bedroom Furniture' />} />
          </Route>
          <Route path="/admin/add-edit-product" element={<AddEditProduct />} />
          <Route path="/admin/add-edit-product/:id" element={<AddEditProduct />} />
        </Routes>
      </AdminContext>
    </div>
  );
}

export default Admin;
