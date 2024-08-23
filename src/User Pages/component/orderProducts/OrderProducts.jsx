// import React, { useEffect, useState } from 'react'

// function OrderProducts() {
//     const [user, setUser] = useState([]);
//     const data = JSON.parse(localStorage.getItem("currentUser"));

//     useEffect(() => {
//         if (data && data.userID) {
//           const userID = data.userID;
    
//           const fetchData = async () => {
//             try {
//               const res = await fetch(`http://localhost:3000/users/order/${userID}`);
//               const data = await res.json();
//               setUser(data);
//               console.log(data);
              
//             } catch (error) {
//               console.error("Error fetching cart data:", error);
//             }
//           };
//           fetchData();
//         }
//       }, []);

//       console.log(user.data);
      

//   return (
//     <div className="wishlist-container">
//     {user?.data?.map((product) => (
//       <div className="product" key={product._id}>
//         <img
//           src={product.image}
//           alt={product.title}
//           className="product-image"
//         />
//         <div className="product-details">
//           <h4>{product.title}</h4>
//           <p>Article no.: {product.description}</p>
//         </div>
//         <div className="product-price">{product.date}</div>
//         <div className="product-price">{product.total_ammount}</div>
//         {/* <button className="add-to-cart">Add to shopping bag</button> */}
//         {/* <button className="delete-icon" onClick={()=>handleRemoveItem(product._id)}>🗑️</button> */}
//       </div>
//     ))}
//     <div className="add-all-section">
//       <p>Do you want to purchase your entire wish list?</p>
//       {/* <button className="add-all">Add all to Shopping Bag</button> */}
//     </div>
//   </div>
// );
// }

// export default OrderProducts
