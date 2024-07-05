import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

function UserDatas() {
  const userDetail = JSON.parse(localStorage.getItem("registrationData")) || [];
  console.log(userDetail);

  return (
    <div className="adminhome ">
      <div>
        <table className="table table-hover table-success table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.map((list, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{list.name}</td>
                <td>{list.email}</td>
                <td>{list.uname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDatas;
