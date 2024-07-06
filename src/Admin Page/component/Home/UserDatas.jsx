import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import useFetch from "../../../Custom Hook/useFetch";
import { useNavigate } from "react-router-dom";

function UserDatas() {

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

  return (
    <div className="adminhome ">
      <div>
        <table className="table table-hover table-success table-striped ">
          <thead className="thead-dark">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Username</th>
              <th>USer Details</th>
            </tr>
          </thead>
          <tbody>
            {user.map((list, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{list.name}</td>
                <td>{list.email}</td>
                <td>{list.uname}</td>
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
