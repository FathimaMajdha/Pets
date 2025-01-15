import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserDetails = () => {
    const navigate=useNavigate();
  
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string()
      .matches(/^[0-9]{5,6}$/, "Postal code must be 5-6 digits")
      .required("Postal code is required"),
  });

  
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-8 bg-red-100">
     
      <Link
        to="/"
        className="text-gray-800 ml-52 font-devonshire text-2xl sm:text-3xl md:text-4xl"
      >
        PetsFood
      </Link>
      <hr />
      <h4 className="text-gray-800 max-w-lg mx-auto p-4 mt-6">Add Delivery Details</h4>

     
      <div className="max-w-lg mx-auto p-4 mt-6">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
             
              <div>
                <label htmlFor="fullName" className="block font-medium">
                  Full Name
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
              </div>

             
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone Number
                </label>
                <Field
                  name="phone"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label htmlFor="address" className="block font-medium">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your address"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label htmlFor="city" className="block font-medium">
                  City
                </label>
                <Field
                  name="city"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your city"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label htmlFor="state" className="block font-medium">
                  State
                </label>
                <Field
                  name="state"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your state"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>

             
              <div>
                <label htmlFor="postalCode" className="block font-medium">
                  Postal Code
                </label>
                <Field
                  name="postalCode"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter your postal code"
                />
                <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <button onClick={()=>{
                    navigate('/payment')
                }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded "
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserDetails;
