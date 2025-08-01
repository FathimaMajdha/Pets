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
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, isBlocked: !currentStatus } : user))
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.map((user) => (user.id === userId ? { ...user, isBlocked: !currentStatus } : user))
        );
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
    <div className="bg-red-100 min-h-screen">
      <Sidebar2 />
      <div className="p-4 pt-28 md:pt-10 md:ml-96">
        <h1 className="text-gray-800 text-2xl font-bold">Users List</h1>

        <div className="relative w-full sm:w-[300px] md:w-[500px] mt-4 md:mt-0 ml-0 sm:ml-8 md:ml-60">
          <input
            type="text"
            placeholder="Search"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white w-full px-4 py-2 text-black border border-gray-300 rounded-lg pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
            <BsSearch />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 mt-10">Loading users...</p>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="mt-10 w-full table-auto">
              <thead className="bg-gray-800 text-white">
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
                  <tr key={user.id} className="bg-white border border-black/10 text-center">
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">{user.orders?.length || 0}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => toggleButton(user.id, user.isBlocked)}
                        className={`w-24 px-2 py-1 rounded text-white ${user.isBlocked ? "bg-red-600" : "bg-green-600"}`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => handleModalOpen(user)}
                        className="w-24 px-2 py-1 rounded bg-gray-700 text-white"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => deleteButton(user.id)}
                        className="w-24 px-2 py-1 rounded bg-red-500 text-white"
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

        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold">User Details</h2>
              <p>
                <strong>Username:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.isBlocked ? "Blocked" : "Active"}
              </p>
              <p>
                <strong>Total Orders:</strong> {selectedUser.orders.length}
              </p>
              <h3 className="text-xl font-semibold mt-4">Order Details</h3>
              <div className="max-h-60 overflow-y-auto">
                {selectedUser.orders?.length > 0 ? (
                  selectedUser.orders.map((order, orderIndex) => (
                    <div key={orderIndex} className="mt-4 border-b pb-2">
                      <h4 className="font-semibold text-lg mb-2">Order {orderIndex + 1}</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="mt-2">
                          <p>
                            <strong>Product:</strong> {item.productName}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                        </div>
                      ))}
                      <p className="mt-2">
                        <strong>Total Amount:</strong> ₹{order.totalAmount?.toFixed(2) ?? "0.00"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No orders available.</p>
                )}
              </div>
              <button onClick={handleModalClose} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
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
