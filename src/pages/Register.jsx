import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegisteredUser } from "./RegisterSlice";
import BackHeader from "../Components/BackHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(fetchRegisteredUser(values));
    if (fetchRegisteredUser.fulfilled.match(result)) {
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-16">
      <BackHeader title="Back" />
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-4xl bg-white border border-black rounded-xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-3">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex items-center justify-center p-6">
            <h4 className="text-lg font-semibold">Create Your Account</h4>
          </div>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="col-span-2 w-full p-6 sm:p-10">
                <div className="mb-6">
                  <h3 className="text-gray-800 text-xl font-bold">Create an account</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                        errors.username && touched.username ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800"
                  >
                    Create an account
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
