import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import useFetch from "../../../Custom Hook/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserDatas() {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()


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


  const handleClick = (id) => {
    navigate(`/adminhome/userdatas/${id}`)
  }

  const filteredUsers = user.filter((list) =>
    list.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="adminhome ">
      <div>  <h2 className="text-center mb-5">
        Users Details
      </h2></div>
      <div className="search-container-products mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <table className="table table-hover table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Username</th>
              <th>Date</th>
              <th>USer Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((list, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{list.name}</td>
                <td>{list.email}</td>
                <td>{list.uname}</td>
                <td>{list.date}</td>
                <td><button className="btn btn-secondary" onClick={()=>handleClick(list.id)}>Click here</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDatas;
