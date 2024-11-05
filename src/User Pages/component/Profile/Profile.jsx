import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData, startEditingField, stopEditingField } from "../../../lib/store/features/userSlice"; // Adjust the path as necessary
import Spinner from "../../../popup box/Spinner";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { userData, loading, isEditing, isAnyFieldEditing } = useSelector(state => state.user);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser"))
    const userID = data?.userID;
    dispatch(fetchUserData(userID));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserData({ userID: userData.id, userData: { ...userData, [name]: value } })); // Assuming you have user ID in userData
  };

  const handleBlur = (field) => {
    dispatch(stopEditingField(field));
  };

  const toggleEdit = (field) => {
    dispatch(startEditingField(field));
  };

  const updateProfile = () => {
    const userID = userData?.id;
    dispatch(updateUserData({ userID, userData })); 
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-details-section">
          <h3 className="details-heading text-white">Profile Details</h3>
          <ul className="details-list">
            {Object.keys(userData).map((key) => (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {isEditing[key] ? (
                  <input
                    type="text"
                    name={key}
                    value={userData[key] || ""}
                    onChange={handleChange}
                    onBlur={() => handleBlur(key)}
                    autoFocus
                  />
                ) : userData[key] ? (
                  <span
                    className="editable"
                    style={{ color: "white", padding: "0 10px" }}
                    onClick={() => toggleEdit(key)}
                  >
                    {userData[key]} <FaEdit />
                  </span>
                ) : (
                  <span className="add-link" onClick={() => toggleEdit(key)}>
                    + Add {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {isAnyFieldEditing && (
            <button className="update-button" onClick={updateProfile}>
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
