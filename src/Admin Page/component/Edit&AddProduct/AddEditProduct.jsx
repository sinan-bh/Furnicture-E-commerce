import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertBox from "../../../popup box/AlertBox";
import "./form.css";

function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    price: "",
    offerPrice: "",
    type: "",
    category: "",
    quantity: "",
  });


  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://backend-ecommerce-furniture.onrender.com/admin/product/${id}`,{
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            ...data.data,
          })
        })
        .catch((error) => {
          console.error("Failed to fetch product data:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const filteredFormData = { ...formData };
    delete filteredFormData._id;
    delete filteredFormData.__v;

    Object.keys(filteredFormData).forEach((key) => {
      formDataToSend.append(key, filteredFormData[key]);
    });

    if (file) {
      formDataToSend.append("image", file);
    }

    try {
      const options = {
        method: id ? "PUT" : "POST",
        body: formDataToSend,
        credentials: 'include'
      };

      const url = id
        ? `https://backend-ecommerce-furniture.onrender.com/admin/products/${id}`
        : "https://backend-ecommerce-furniture.onrender.com/admin/products";

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAlert({ type: 'success', message: id ? 'Product Updated' : 'Product Added' });
      setTimeout(() => navigate("/adminhome/product-details"), 1000);
      
    } catch (error) {
      console.error("Failed to add/edit product:", error);
      setAlert({ type: 'error', message: 'Update failed' });
        setTimeout(() => setAlert(null), 1000);
    }
  };

  return (
    <div className="add-edit-product-form">
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div>
        <h3 className="text-center ">
          {id ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="d-flex">
            <div className="">
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleFileChange}
                  required = {!id ? true : false}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
            </div>
            <div className="">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Details:</label>
                <textarea
                  className="form-control"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="qty-price">
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  className=""
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <div className="form-group">
                  <label>Offer Price:</label>
                  <input
                    type="number"
                    className=""
                    name="offerPrice"
                    value={formData.offerPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group qty">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="selectCategory">
            <div className="form-group">
              <label>Type:</label>
              <select
                className="form-control"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="Living Room Furniture">
                  Living Room Furniture
                </option>
                <option value="Dining Room Furniture">
                  Dining Room Furniture
                </option>
                <option value="Bedroom Furniture">Bedroom Furniture</option>
              </select>
            </div>
            <div className="form-group ms-3">
              <label>Category:</label>
              <select
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="livingroom">livingroom</option>
                <option value="diningroom">diningroom</option>
                <option value="bedroom">bedroom</option>
              </select>
            </div>
          </div>
          <div className="add-btn">
            <button type="submit" className="btn btn-secondary">
              {id ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditProduct;
