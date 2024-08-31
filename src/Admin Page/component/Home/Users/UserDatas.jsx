import "./userDatas.css";
import useFetch from "../../../../Custom Hook/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserDatas() {
  const [users,setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://backend-ecommerce-furniture.onrender.com/admin/allusers`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
        });
        const users = await res.json();

        setUsers(users);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);


  const filteredUsers = users?.data?.filter((list) =>
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
            {filteredUsers?.map((list, index) => (
              <tr key={index}>
                <td data-label="Index">{index + 1}</td>
                <td data-label="Name">{list.name}</td>
                <td data-label="E-mail">{list.email}</td>
                <td data-label="Username">{list.userName}</td>
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
