import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Sidebar2 from "./Sidebar2";
import { BsSearch } from "react-icons/bs";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchVal]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/Admin/users/paginated?page=${currentPage}&pageSize=${usersPerPage}&keyword=${searchVal}`
      );
      const result = response.data;

      const sortedUsers = result.data.items.sort((a, b) => a.id - b.id);
      setFilteredUsers(sortedUsers);
      setUsers(sortedUsers);
      setTotalPages(Math.ceil(result.data.totalCount / usersPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const toggleButton = (userId, currentStatus) => {
    axiosInstance
      .patch(`/Admin/${userId}`, { IsBlocked: !currentStatus })
      .then(() => {
        const updateUserStatus = (usersList) =>
          usersList.map((user) =>
            user.id === userId ? { ...user, isBlocked: !currentStatus } : user
          );

        setUsers(updateUserStatus);
        setFilteredUsers(updateUserStatus);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        alert("Failed to update user status. Please try again.");
      });
  };

  const deleteButton = (userId) => {
    axiosInstance
      .delete(`/Admin/${userId}`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setFilteredUsers((prev) => prev.filter((u) => u.id !== userId));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar2 />
      <div className="p-6 pt-28 md:pt-10 md:ml-96">
        <h1 className="text-gray-800 text-3xl font-bold mb-6">Users List</h1>

        <div className="relative w-full max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
            <BsSearch />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading users...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-800 text-white uppercase text-sm">
                <tr>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Orders</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3" colSpan="3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white hover:bg-blue-50 transition-all border-b border-gray-200 text-center"
                  >
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">{user.orders?.length || 0}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => toggleButton(user.id, user.isBlocked)}
                        className={`w-24 py-1 rounded-full text-white text-sm font-medium shadow ${
                          user.isBlocked
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => handleModalOpen(user)}
                        className="w-24 py-1 rounded-full bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium shadow"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => deleteButton(user.id)}
                        className="w-24 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
              <p className="mb-2">
                <strong>Username:</strong> {selectedUser.name}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}
              </p>
              <p className="mb-4">
                <strong>Total Orders:</strong> {selectedUser.orders.length}
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Details</h3>
              <div className="max-h-60 overflow-y-auto">
                {selectedUser.orders?.length > 0 ? (
                  selectedUser.orders.map((order, index) => (
                    <div key={index} className="border-b border-gray-200 py-2">
                      <h4 className="font-medium">Order {index + 1}</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-sm ml-2">
                          <p>
                            <strong>Product:</strong> {item.productName}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                        </div>
                      ))}
                      <p className="mt-2 font-semibold text-sm">
                        Total: ₹{order.totalAmount?.toFixed(2) ?? "0.00"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No orders available.</p>
                )}
              </div>

              <div className="text-right mt-6">
                <button
                  onClick={handleModalClose}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
