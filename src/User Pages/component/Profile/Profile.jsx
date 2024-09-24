import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";
import { userContext } from "../../../context/CartContext";
import Spinner from "../../../popup box/Spinner";

function Profile() {
  const {
    userData,
    loading,
    setUserData,
    isEditing,
    setIsEditing,
    isAnyFieldEditing,
    setIsAnyFieldEditing,
    updateUserData,
  } = useContext(userContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleBlur = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    checkIfAnyFieldIsEditing(); 
  };

  const checkIfAnyFieldIsEditing = () => {
    const isEditingNow = Object.values(isEditing).some((edit) => edit === true);
    setIsAnyFieldEditing(isEditingNow);
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setIsAnyFieldEditing(true);
  };

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-details-section">
          <h3 className="details-heading text-white">Profile Details</h3>
          <ul className="details-list">
            <li>
              <strong>Name:</strong>{" "}
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={userData?.name || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  autoFocus
                />
              ) : userData?.name ? (
                <span
                  className="editable"
                  style={{ color: "white", padding: "0 10px" }}
                  onClick={() => toggleEdit("name")}
                >
                  {userData?.name} <FaEdit />
                </span>
              ) : (
                <span className="add-link" onClick={() => toggleEdit("name")}>
                  + Add Name
                </span>
              )}
            </li>

            <li>
              <strong>User Name:</strong>{" "}
              {isEditing.userName ? (
                <input
                  type="text"
                  name="userName"
                  value={userData?.userName || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("userName")}
                  autoFocus
                />
              ) : userData?.userName ? (
                <span
                  className="editable"
                  style={{ color: "white", padding: "0 10px" }}
                  onClick={() => toggleEdit("userName")}
                >
                  {userData?.userName} <FaEdit />
                </span>
              ) : (
                <span
                  className="add-link"
                  onClick={() => toggleEdit("userName")}
                >
                  + Add User Name
                </span>
              )}
            </li>

            <li>
              <strong>Mobile:</strong>{" "}
              {isEditing.phone ? (
                <input
                  type="text"
                  name="phone"
                  value={userData?.phone || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone")}
                  autoFocus
                />
              ) : userData?.phone ? (
                <span
                  className="editable"
                  style={{ color: "white", padding: "0 10px" }}
                  onClick={() => toggleEdit("phone")}
                >
                  {userData?.phone} <FaEdit />
                </span>
              ) : (
                <span className="add-link" onClick={() => toggleEdit("phone")}>
                  + Add Phone
                </span>
              )}
            </li>

            <li>
              <strong>Email:</strong>{" "}
              {isEditing.email ? (
                <input
                  type="email"
                  name="email"
                  value={userData?.email || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  autoFocus
                />
              ) : userData?.email ? (
                <span
                  className="editable"
                  style={{ color: "white", padding: "0 10px" }}
                  onClick={() => toggleEdit("email")}
                >
                  {userData?.email} <FaEdit />
                </span>
              ) : (
                <span className="add-link" onClick={() => toggleEdit("email")}>
                  + Add Email
                </span>
              )}
            </li>

            <li>
              <strong>Address:</strong>{" "}
              {isEditing.address ? (
                <input
                  type="text"
                  name="address"
                  value={userData?.address || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("address")}
                  autoFocus
                />
              ) : userData?.address ? (
                <span
                  className="editable"
                  style={{ color: "white", padding: "0 10px" }}
                  onClick={() => toggleEdit("address")}
                >
                  {userData?.address} <FaEdit />
                </span>
              ) : (
                <span
                  className="add-link"
                  onClick={() => toggleEdit("address")}
                >
                  + Add Address
                </span>
              )}
            </li>
          </ul>

          {isAnyFieldEditing && (
            <button className="update-button" onClick={updateUserData}>
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
