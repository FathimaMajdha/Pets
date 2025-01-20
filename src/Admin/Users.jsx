import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "./Sidebar2";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  const toggleButton = (userId, currentStatus) => {
    axios
      .patch(`http://localhost:3000/users/${userId}`, { isBlocked: !currentStatus })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
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
        <h1 className="text-gray-800 text-2xl ml-96 font-bold">Users List</h1>

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
                {users.map((user) => (
                  <tr key={user.id} className="bg-white border border-black/10">
                    <td className="px-12 py-4">{user.username}</td>
                    <td className="px-12 py-4">{user.orders.length}</td>
                    <td className="px-12 py-4">{user.email}</td>
                    <td className="px-12 py-4">{user.password}</td>
                    <div className="col-span-2">
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
