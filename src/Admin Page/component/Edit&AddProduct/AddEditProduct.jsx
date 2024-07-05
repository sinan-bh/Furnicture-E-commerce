import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./form.css";

function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id ,
    image: "",
    imageCategory: "",
    description: "",
    details: "",
    price: "",
    offerPrice: "",
    type: "",
    // type: 
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            ...data,
            type: "edit"
          });
        })
        .catch(error => {
          console.error("Failed to fetch product data:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id || id ==='') {
        const uniqueId = Date.now().toString();
        setFormData({
          ...formData,
          id: uniqueId
        });
      }

      const options = {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };

      const url = id 
        ? `http://localhost:8000/products/${id}`
        : "http://localhost:8000/products";

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/admin/product-details"); 
    } catch (error) {
      console.error("Failed to add/edit product:", error);
    }
  };

  return (
    <div className="add-edit-product-form">
      <h3>{id ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image Category:</label>
          <input
            type="text"
            className="form-control"
            name="imageCategory"
            value={formData.imageCategory}
            onChange={handleInputChange}
            required
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
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
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
            className="form-control"
            name="offerPrice"
            value={formData.offerPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            <option value="Living Room Furniture">Living Room Furniture</option>
            <option value="Dining Room Furniture">Dining Room Furniture</option>
            <option value="Bedroom Furniture">Bedroom Furniture</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Save Changes" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProduct;
