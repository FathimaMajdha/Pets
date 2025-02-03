
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchRegisteredUser } from './RegisterSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(fetchRegisteredUser(values));
    if (fetchRegisteredUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg">Create Your Account</h4>
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

                <div>
                  <label className="text-gray-600 text-sm mb-2 block">Phone Number</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className={`text-gray-800 bg-white border w-full text-sm pl-4 pr-8 py-2.5 rounded-md ${
                      errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              <div className="sm:!mt-12 mt-6">
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
  );
};

export default Register;

