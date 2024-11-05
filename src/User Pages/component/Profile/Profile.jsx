import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  updateUserData,
  startEditingField,
  stopEditingField,
} from "../../../lib/store/features/userSlice";
import Spinner from "../../../popup box/Spinner";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const { userData, loading, isEditing, isAnyFieldEditing } = useSelector(
    (state) => state.user
  );
  const [localUserData, setLocalUserData] = useState(userData);
  const data = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const userID = data?.userID;
    dispatch(fetchUserData(userID));
  }, [dispatch]);

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData((prev) => ({ ...prev, [name]: value }));
    dispatch(startEditingField(name));
  };

  const handleBlur = (field) => {
    dispatch(stopEditingField(field));
  };

  const toggleEdit = (field) => {
    dispatch(startEditingField(field));
  };

  const handleUpdate = () => {
    const userID = data?.userID;
    dispatch(updateUserData({ userID, userData: localUserData }));
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-details-section">
          <h3 className="details-heading text-white">Profile Details</h3>
          <ul className="details-list">
            {["name", "userName", "phone", "email", "address"].map((field) => (
              <li key={field}>
                <strong>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </strong>{" "}
                {isEditing[field] ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={localUserData[field] || ""}
                    onChange={handleChange}
                    onBlur={() => handleBlur(field)}
                    autoFocus
                  />
                ) : localUserData[field] ? (
                  <span
                    className="editable"
                    style={{ color: "white", padding: "0 10px" }}
                    onClick={() => toggleEdit(field)}
                  >
                    {localUserData[field]} <FaEdit />
                  </span>
                ) : (
                  <span className="add-link" onClick={() => toggleEdit(field)}>
                    + Add {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {isAnyFieldEditing && (
            <button className="update-button" onClick={handleUpdate}>
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
