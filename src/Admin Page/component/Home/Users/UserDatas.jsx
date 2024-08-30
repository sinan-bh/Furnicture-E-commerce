import "./userDatas.css";
import useFetch from "../../../../Custom Hook/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserDatas() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: user,
    error,
    loading,
  } = useFetch("http://localhost:3000/admin/allusers");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  if (!user || user.length === 0) {
    return <div>No products found.</div>;
  }

  const handleClick = (id) => {
    navigate(`/adminhome/userdatas/${id}`);
  };

  const filteredUsers = user.data.filter((list) =>
    list.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-data-container">
      <div>
        <h2 className="text-center mb-5">Users Details</h2>
      </div>
      <div className="search-container-user ">
        <input
          type="text"
          placeholder="Search by date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <table className="user-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Username</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((list, index) => (
              <tr key={index}>
                <td data-label="Index">{index + 1}</td>
                <td data-label="Name">{list.name}</td>
                <td data-label="E-mail">{list.email}</td>
                <td data-label="Username">{list.uname}</td>
                <td data-label="Date">{list.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDatas;
