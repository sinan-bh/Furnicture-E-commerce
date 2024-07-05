import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../Custom Hook/useFetch';


export const formContext = createContext()

function AdminContext(props) {
    const {id} = useParams()


    const {
        data: products,
        loading,
        error,
        setData: setProducts,
      } = useFetch("http://localhost:8000/products");
    

    const [product, setProduct] = useState({
      image: "",
      imageCategory: "",
      description: "",
      details: "",
      price: "",
      offerPrice: "",
    });
  
    const [selectedCategory, setSelectedCategory] = useState("");
  
    useEffect(() => {
      if (id) {
        fetchProduct(id);
      }
    }, [id]);
  
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedCategory(data.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({
        ...product,
        [name]: value,
      });
    };

    const handleAddProduct = (addedProduct) => {
        setProducts([...products, addedProduct]);
      };

    const formValue = {products,error,loading,setProducts,id,product, setProduct,selectedCategory, setSelectedCategory,fetchProduct,handleInputChange,handleAddProduct }

  return (
    <formContext.Provider value={formValue}>
      {props.children}
    </formContext.Provider>
  )
}

export default AdminContext
