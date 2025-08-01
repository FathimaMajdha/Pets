import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import BackHeader from "../Components/BackHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

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
    streetName: Yup.string().required("Street name is required"),
    city: Yup.string().required("City is required"),
    homeAddress: Yup.string().required("Home address is required"),
    customerPhone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
      .required("Phone number is required"),
    postalCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter valid 6-digit pincode")
      .required("Pincode is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        toast.warn("User not logged in!");
        return;
      }

      const address = {
        streetName: values.streetName,
        city: values.city,
        homeAddress: values.homeAddress,
        customerPhone: values.customerPhone,
        postalCode: values.postalCode,
      };

      const totalAmount = orderDetails?.items.reduce((acc, item) => {
        const price = Number(item.product?.price);
        const quantity = Number(item.quantity);
        return acc + (price || 0) * (quantity || 1);
      }, 0);

      const paymentDetails = {
        cardholderName: values.cardholderName,
        cardNumber: values.cardNumber,
        expirationDate: values.expirationDate,
        cvv: values.cvv,
      };

      localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

      const razorRes = await axiosInstance.post("/Order/razorpay/create", {
        Price: totalAmount,
      });

      const razorpay_order_id = razorRes.data.data;

      const options = {
        key: "rzp_test_HDLC1terx8qsOw",
        amount: totalAmount * 100,
        currency: "INR",
        name: "PetsFood",
        description: "Order Payment",
        order_id: razorpay_order_id,
        handler: async function (response) {
          try {
            const orderPayload = {
              address,
              totalAmount,
              razorpay_order_id: response.razorpay_order_id,
              deliveryStatus: "Processing",
              orderItems: (orderDetails?.items || []).map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                description: item.product?.description || item.product?.productName || "No description",
              })),
            };

            const checkoutRes = await axiosInstance.post(`/Order/checkout/${userId}`, orderPayload);

            if (checkoutRes.status === 200) {
              const verifyRes = await axiosInstance.post("/Order/razorpay/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.status === 200) {
                toast.success("Payment and Order successful!");
                navigate("/order", { state: { orderDetails: orderPayload } });
              } else {
                toast.error("Payment verification failed.");
              }
            } else {
              toast.error("Order saving failed before verification.");
            }
          } catch (error) {
            console.error("Error in order/payment flow:", error);
            toast.error("Something went wrong during order processing.");
          }
        },

        prefill: {
          name: values.cardholderName,
          contact: values.customerPhone,
          email: user?.email || "guest@example.com",
        },
        theme: {
          color: "#f55656",
        },
      };

      if (window.Razorpay) {
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        toast.error("Razorpay script not loaded.");
      }
    } catch (error) {
      console.error("Order or payment error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 text-white">
        <BackHeader title="Back" />

        <div className="bg-gray-800 text-white py-8 px-4 sm:px-10 text-2xl sm:text-3xl md:text-4xl font-devonshire text-center">
          PetsFood
        </div>

        <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-gray-800 rounded-lg ">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-6">
            Payment & Address Details
          </h2>

          <Formik
            initialValues={{
              cardholderName: "",
              cardNumber: "",
              expirationDate: "",
              cvv: "",
              streetName: "",
              city: "",
              homeAddress: "",
              customerPhone: "",
              postalCode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {["cardholderName", "cardNumber", "expirationDate", "cvv"].map((field, i) => (
                  <div key={i}>
                    <label className="block font-medium text-white capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <Field name={field} className="w-full border p-2 rounded text-black" />
                    <ErrorMessage name={field} className="text-red-500 text-sm" component="div" />
                  </div>
                ))}

                {["streetName", "city", "homeAddress", "customerPhone", "postalCode"].map((field, i) => (
                  <div key={i}>
                    <label className="block font-medium text-white capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <Field name={field} className="w-full border p-2 rounded text-black" />
                    <ErrorMessage name={field} className="text-red-500 text-sm" component="div" />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                  Proceed to Payment
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Payment;
