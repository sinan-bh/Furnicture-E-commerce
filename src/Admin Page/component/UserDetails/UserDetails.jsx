import React from 'react';
import './UserDetails.css';
import useFetch from '../../../Custom Hook/useFetch';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();

  const {
    data: user,
    error,
    loading,
  } = useFetch("http://localhost:8000/user");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || user.length === 0) {
    return <div>No products found.</div>;
  }


  return (
    <div className="user-details-container">
      <table className="user-details-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Image</th>
            <th>Name</th>
            <th>Order Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => {
            if (user.id === id) {
              return (
                <tr key={user.order.id}>
                  <td>{user.order.id}</td>
                  <td><img src={user.order.image} alt="User" className="user-image" /></td>
                  <td>{user.order.name}</td>
                  <td>{user.order.quantity}</td>
                  <td>{user.order.status}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
