import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  
  const handleSubmit = async (values) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;
  
        const user = users.find(
          (user) => user.username === values.username && user.password === values.password
        );

        if(!user && admin.username===values.username && admin.password === values.password){
          navigate('/admin')
        }else if (user) {
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);  
        console.log("Login Successful:", values);
        navigate("/admin"); 

      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data. Please try again later.");
    }
  };
 
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96 text-center">
        <div className="text-gray-800 font-devonshire text-4xl">PetsFood</div>
        <h3 className="text-lg">Enter your login credentials</h3>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <label className="block mt-4 mb-2 text-left text-gray-700 font-bold">
              Username:
            </label>
            <Field
              type="text"
              name="username"
              className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-800"
              placeholder="Enter your username"
            />
            <ErrorMessage name="username" component="p" className="text-red-500 text-left" />

            <label className="block mb-2 text-left text-gray-700 font-bold">
              Password:
            </label>
            <Field
              type="password"
              name="password"
              className="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
              placeholder="Enter your password"
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
