import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../Features/ContextProvider";

const Payment = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); 

  
  const validationSchema = Yup.object().shape({
    cardholderName: Yup.string().required("Cardholder name is required"),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Card number is required"),
    expirationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiration date must be in MM/YY format")
      .required("Expiration date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
      .required("CVV is required"),
  });

  
  const handleSubmit = (values) => {
    console.log("Payment Details:", values);
    alert("Payment details submitted successfully!");

   
    const userId = "9dbf";  
    const orderDetails = {
      orderId: new Date().toISOString(),
      cartItems: cart,
      paymentInfo: values,
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const user = response.data.find((user) => user.id === userId);
        if (user) {
          user.orders.push(orderDetails);

        
          axios
            .put(`http://localhost:3000/users/${userId}`, user)
            .then(() => {
              console.log("Order saved successfully!");
              
              navigate("/order", { state: { orderDetails } });
            })
            .catch((error) => {
              console.error("Error saving the order:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <>
      <div className="text-gray-800 ml-20 mt-6 font-devonshire text-2xl sm:text-3xl md:text-4xl">
        PetsFood
      </div>
      <hr />
      <div className="max-w-md mx-auto p-6 bg-red-100 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
        <Formik
          initialValues={{
            cardholderName: "",
            cardNumber: "",
            expirationDate: "",
            cvv: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="cardholderName" className="block font-medium text-gray-700">
                  Cardholder Name
                </label>
                <Field
                  name="cardholderName"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter cardholder name"
                />
                <ErrorMessage name="cardholderName" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label htmlFor="cardNumber" className="block font-medium text-gray-700">
                  Card Number
                </label>
                <Field
                  name="cardNumber"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter 16-digit card number"
                />
                <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm" />
              </div>

             
              <div>
                <label htmlFor="expirationDate" className="block font-medium text-gray-700">
                  Expiration Date (MM/YY)
                </label>
                <Field
                  name="expirationDate"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="MM/YY"
                />
                <ErrorMessage name="expirationDate" component="div" className="text-red-500 text-sm" />
              </div>

             
              <div>
                <label htmlFor="cvv" className="block font-medium text-gray-700">
                  CVV
                </label>
                <Field
                  name="cvv"
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Enter CVV"
                />
                <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm" />
              </div>

             
              <div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                >
                  Proceed to Payment
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Payment;
