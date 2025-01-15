import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import Dashboard from "./Dashboard";

const Admin = () => {
  const [user, setUser] = useState([]);

  const toggleButton =(userid, isBlocked) => {
    // try {
    //   await axios.put(`http://localhost:3000/users/${userid}`, { isBlocked: !isBlocked });

      const New= user.map((user) => 
        user.id === userid ? { ...user, isBlocked:!isBlocked } : user
      );
      
      setUser(New);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };
    }

  useEffect(() => {
   
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
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
              <th>User Id</th>
              <th className="px-40">UserName</th>
              <th className="px-20">User Email</th>
              <th className="px-20">Password</th>
            </tr>
          </thead>
          <tbody>
            {user.map((details) => (
              <tr key={details.id}>
                <td>{details.id}</td>
                <td className="text-lg font-bold text-gray-600 mb-2 px-40">{details.username}</td>
                <td className="text-gray-600 text-sm mb-2 px-40">{details.email}</td>
                <td className="text-gray-600 text-sm mb-2 px-40">{details.password}</td>
                <td>
                  <button
                    onClick={() => toggleButton(details.id, details.isBlocked)}
                    style={{ backgroundColor: "green", color: "white", width: "100px" }}
                    type="button"
                  >
                    {details.isBlocked ? "Block" : "UnBlock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
