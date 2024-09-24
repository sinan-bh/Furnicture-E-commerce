import "./userDatas.css";
import useFetch from "../../../../Custom Hook/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../../../popup box/Pagination";
import Spinner from "../../../../popup box/Spinner";
import { formContext } from "../../../../context/AdminContext";

function UserDatas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const { users, loading} = useContext(formContext)

  const filteredUsers = users?.data?.filter((list) =>
    list.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredUsers?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div><Spinner /></div>;
  }

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
              <th>User Details</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((list, index) => (
              <tr key={index}>
                <td data-label="Index">{index + 1}</td>
                <td data-label="Name">{list.name}</td>
                <td data-label="E-mail">{list.email}</td>
                <td data-label="Username">{list.userName}</td>
                <td data-label="Date">{list.date}</td>
                {console.log(list._id)}
                <td data-label="Date"><Link to={`/adminhome/user/${list?._id}`}>click here</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredUsers?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default UserDatas;
