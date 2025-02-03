import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginUser } from "./LoginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAdmin } = useSelector((state) => state.login);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(fetchLoginUser(values));
  
    if (fetchLoginUser.fulfilled.match(result)) {
      if (result.payload.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/"); 
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96 text-center">
        <div className="text-gray-800 font-devonshire text-4xl">PetsFood</div>
        <h3 className="text-lg">Enter your login credentials</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
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

            <label className="block mb-2 text-left text-gray-700 font-bold">
              Password:
            </label>
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "Submit"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Form>
        </Formik>

        <p className="mt-4">
          Not registered?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
