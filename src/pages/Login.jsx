import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const handleSubmit = (values) => {
    console.log(values)
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        
        const admin = response.data.find(
          (user) =>
            values.email === user.email &&
            values.password === user.password &&
            values.password === "123456" &&
            values.email === "admin@gmail.com" 
        );
        
        if (admin) {
          localStorage.setItem("userid", admin.id);
          localStorage.setItem("email", admin.username);
          console.log("Admin Login Successful:", values);
          setUser(admin);
          navigate("/dashboard"); 
        } else {
          
          const userDetail = response.data.find(
            (user) =>
              values.email === user.email && values.password === user.password
            );
            if(userDetail.isBlocked){
              alert("this user can't login")
            }else if (!userDetail.isBlocked) {
            localStorage.setItem("userid", userDetail.id);
            localStorage.setItem("username", userDetail.username);
            console.log("Login Successful:", values);
            setUser(userDetail);
            navigate("/"); 
            
          }
        }
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96 text-center">
        <div className="text-gray-800 font-devonshire text-4xl">PetsFood</div>
        <h3 className="text-lg">Enter your login credentials</h3>

        <Formik
          initialValues={{
            email: "",
            password:""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <label className="block mt-4 mb-2 text-left text-gray-700 font-bold">
              Email:
            </label>
            <Field
              type="email"
              name="email"
              className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              placeholder="Enter your email"
              autoComplete="current-email"
              
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-left" />

            <label className="block mb-2 text-left text-gray-700 font-bold">password:</label>
            <Field
              name="password"
              type="password"
              className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              placeholder="Enter your password"
              autoComplete="current-password"
              
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-left" />

            <button
              type="submit"
              className="bg-gray-800 text-white py-3 px-6 rounded-md transition-colors duration-300 hover:bg-gray-900"
            >
              Submit
            </button>
          </Form>
        </Formik>

        <p className="mt-4">
          Not registered?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;