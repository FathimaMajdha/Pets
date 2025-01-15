import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const existingUsers = response.data;

     
      const userExists = existingUsers.some(
        (user) => user.email === values.email || user.username === values.username
      );

      if (userExists) {
        alert("User already exists. Please use a different email or username.");
      } else {
        
        const newUser = {
          ...values,
          cart: [],
          orders: [],
          isBlocked:false,
        };

        const registerResponse = await axios.post("http://localhost:3000/users", newUser);

        if (registerResponse.status === 201) {
          console.log("User registered successfully:", registerResponse.data);

          
          localStorage.setItem("userId", registerResponse.data.id);

          alert("User registered successfully!");
          resetForm();
          navigate("/login");
        } else {
          throw new Error("Failed to register. Please try again.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and secure. We prioritize your privacy and data
              security.
            </p>
          </div>
        </div>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
              <div className="mb-6">
                <h3 className="text-gray-800 text-xl font-bold">Create an account</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Username</label>
                  <div className="relative">
                    <Field
                      name="username"
                      type="text"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                        errors.username && touched.username ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={touched.username && errors.username ? errors.username : "Enter username"}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Email</label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={touched.email && errors.email ? errors.email : "Enter email"}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={touched.password && errors.password ? errors.password : "Enter password"}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Field
                      name="phoneNumber"
                      type="text"
                      className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500 ${
                        errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={
                        touched.phoneNumber && errors.phoneNumber
                          ? errors.phoneNumber
                          : "Enter your phone number"
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="sm:!mt-12 mt-6">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                >
                  Create an account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
