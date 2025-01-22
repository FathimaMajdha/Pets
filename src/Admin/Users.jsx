import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");  

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  
  const handleSearchClick = () => {
    if (searchVal === "") {
      setFilteredUsers(users);  
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredUsers(filtered);  
    }
  };

  const toggleButton = (userId, currentStatus) => {
    axios
      .patch(`http://localhost:3000/users/${userId}`, { isBlocked: !currentStatus })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isBlocked: !currentStatus } : user
          )
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.map((user) =>
            user.id === userId ? { ...user, isBlocked: !currentStatus } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        alert("Failed to update user status. Please try again.");
      });
  };

  const deleteButton = (userId) => {
    axios
      .delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user.id !== userId)
        );
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      });
  };

  return (
    <div className="bg-red-100 h-screen">
      <Sidebar2 />
      <div className="p-10 ml-96">
        <h1 className="text-gray-800 text-2xl font-bold">Users List</h1>

        <div className="relative ml-4 sm:ml-8 md:ml-60 flex-grow">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchVal}  
            onChange={(e) => setSearchVal(e.target.value)}  
            onKeyUp={handleSearchClick}  
            className="bg-white w-full sm:w-[400px] md:w-[500px] lg:w-[600px] px-4 py-3 text-black border border-gray-300 rounded-lg pl-10 -mt-24"
          />
          <button
            type="button"
            className="absolute left-5 top-3 transform -translate-y-1/2 text-gray-500"
            aria-label="Search"
            onClick={handleSearchClick}  
          >
            <BsSearch className="handle" />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="mt-10">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th scope="col">UserName</th>
                  <th scope="col">Orders</th>
                  <th scope="col">User Email</th>
                  <th scope="col">User Password</th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="bg-white border border-black/10">
                    <td className="px-12 py-4">{user.username}</td>
                    <td className="px-12 py-4">{user.orders.length}</td>
                    <td className="px-12 py-4">{user.email}</td>
                    <td className="px-12 py-4">{user.password}</td>
                    <div>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => toggleButton(user.id, user.isBlocked)}
                        style={{
                          backgroundColor: user.isBlocked ? "red" : "green",
                          color: "white",
                          width: "100px",
                        }}
                        type="button"
                      >
                        {user.isBlocked ? "UnBlock" : "Block"}
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => navigate(`/viewdetails/${user.id}`)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "100px",
                        }}
                        type="button"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => deleteButton(user.id)}
                        style={{
                          backgroundColor: "darkorange",
                          color: "white",
                          width: "100px",
                        }}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

