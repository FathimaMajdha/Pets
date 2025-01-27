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
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Selected user data for modal
  const usersPerPage = 5;
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
    setCurrentPage(1);
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

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
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
                        onClick={() => handleModalOpen(user)}
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

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 ml-2 mr-2 py-2 bg-gray-300 text-gray-800 rounded ${
                currentPage === index + 1 ? 'bg-blue-600' : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

       {showModal && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold">User Details</h2>
      <p><strong>Username:</strong> {selectedUser.username}</p>
      <p><strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
      <p><strong>Total Orders:</strong> {selectedUser.orders.length}</p>
      <h3 className="text-xl font-semibold mt-4">Order Details</h3>
      
      {/* Scrollable area for orders */}
      <div className="max-h-60 overflow-y-auto">
      <h4 className="mt-2">Cart Items:</h4>
        {selectedUser.orders.length > 0 ? (
          selectedUser.orders.map((order) => (
            
            <div key={order.orderId} className="mt-4">
              
              {order.cartItems.map((item, idx) => (
                <div key={idx} className="mt-2">
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  <p><strong>Price:</strong> ${item.quantity}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>

      <button
        onClick={handleModalClose}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Users;


