import React from "react";
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";

useEffect(() => {
  axios
    .get("http://localhost:3000/products")
    .then((response) => {
      const products = response.data[0]; 
      const all = products.all || [];
      setCart(all);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []); 


const Admin = () => {
  return (
    <div>
      <AdminNav />
      {/* <Dashboard/> */}
      <div className="p-20">
        <h1 className="text-gray-800 text-2xl">Recent Login</h1>
        <hr />
        <table>
          <div>
            <th className="px-20">UserName</th>
            <th className="px-20">Login Details</th>
            <th className="px-20">Time</th>
          </div>
          <td></td>
        </table>
      </div>
    </div>
  );
};

export default Admin;
