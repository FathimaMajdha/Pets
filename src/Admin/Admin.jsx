import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import Dashboard from "./Dashboard";

const Admin = () => {
  const [user, setUser] = useState([]);
  const[isOpen,setIsopen]=useState(false);


  const toggleButton = () => {
    
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const user = response.data;
        setUser(user);
      })
      .catch((error) => {
        console.error("Error fetching users details:", error);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      {/* <Dashboard/> */}
      <div className="p-20">
        <h1 className="text-gray-800 text-2xl">Recent Login</h1>
        <hr />
        <table>
          <thead>
          <tr>
          <th >User Id</th>
            <th className="px-40">UserName</th>
            <th className="px-20"> User Email</th>
            <th className="px-20">Password</th>
          </tr>
          </thead>
          <tbody>
         
          {user.map((details) => (
              <tr >
                <td> {details.id}</td>
                <td className="text-lg font-bold text-gray-600 mb-2 px-40">{details.username}</td>
                <td className="text-gray-600 text-sm mb-2 px-40">{details.email}</td>
                <td className="text-gray-600 text-sm mb-2 px-40">{details.password}</td>
                <button onClick={toggleButton} type="button">Block</button>
              </tr>
          ))}
          

          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default Admin;
