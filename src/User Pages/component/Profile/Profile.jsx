import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState({
    name: false,
    userName: false,
    phone: false,
    email: false,
    address: false,
  });
  const [isAnyFieldEditing, setIsAnyFieldEditing] = useState(false); // Track if any field is being edited

  const data = JSON.parse(localStorage.getItem("currentUser"));
  const userID = data?.userID;

  useEffect(() => {
    if (userID) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/users/profile/${userID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const fetchedData = await res.json();
          setUserData(fetchedData);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchData();
    }
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleBlur = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    checkIfAnyFieldIsEditing(); // Check if any field is still being edited
  };

  const checkIfAnyFieldIsEditing = () => {
    const isEditingNow = Object.values(isEditing).some((edit) => edit === true);
    setIsAnyFieldEditing(isEditingNow);
  };

  const updateUserData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/profile/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        setIsEditing({
          name: false,
          userName: false,
          phone: false,
          email: false,
          address: false,
        });
        setIsAnyFieldEditing(false); 
      } else {
        console.error("Failed to update profile data");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setIsAnyFieldEditing(true); 
  };

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
