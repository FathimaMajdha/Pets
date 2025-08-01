import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

const CardNumberField = ({ name }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    helpers.setValue(formatted);
  };

  return (
    <input
      {...field}
      onChange={handleChange}
      value={field.value}
      placeholder="1234 5678 9012 3456"
      maxLength={19}
      className="w-full border p-2 rounded text-black"
    />
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const validationSchema = Yup.object().shape({
    cardholderName: Yup.string().required("Cardholder name is required"),
    cardNumber: Yup.string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits with spaces")
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
        cardNumber: values.cardNumber.replace(/\s/g, ""),
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
      <div className="min-h-screen bg-white text-black">
        <div className="bg-gray-800 text-white py-8 text-center text-3xl font-devonshire shadow-md">PetsFood</div>

        <div className="max-w-3xl mx-auto my-8 px-4 sm:px-8">
          <div className="bg-white border shadow-lg rounded-xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800">Payment & Address Details</h2>

            {orderDetails?.items && orderDetails.items.length > 0 && (
              <div className="mb-6 border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Selected Products:</h3>
                <ul className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-1 text-sm">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product?.imageUrl}
                          alt={item.product?.productName || "Product Image"}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{item.product?.productName || "Unnamed Product"}</div>
                          <div className="text-gray-600">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-right">₹{Number(item.product?.price || 0) * Number(item.quantity || 1)}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {orderDetails?.items && (
              <div className="text-right font-semibold text-gray-800 mt-2">
                Total: ₹
                {orderDetails.items.reduce((acc, item) => {
                  const price = Number(item.product?.price || 0);
                  const qty = Number(item.quantity || 1);
                  return acc + price * qty;
                }, 0)}
              </div>
            )}

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
                <Form className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                      <Field
                        name="cardholderName"
                        placeholder="Enter your name"
                        className="w-full border p-2 rounded text-black"
                      />
                      <ErrorMessage name="cardholderName" className="text-red-500 text-sm" component="div" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <CardNumberField name="cardNumber" />
                      <ErrorMessage name="cardNumber" className="text-red-500 text-sm" component="div" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiration Date (MM/YY)</label>
                        <Field name="expirationDate" placeholder="MM/YY" className="w-full border p-2 rounded text-black" />
                        <ErrorMessage name="expirationDate" className="text-red-500 text-sm" component="div" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <Field name="cvv" placeholder="123" className="w-full border p-2 rounded text-black" />
                        <ErrorMessage name="cvv" className="text-red-500 text-sm" component="div" />
                      </div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Street Name</label>
                        <Field name="streetName" placeholder="Street" className="w-full border p-2 rounded text-black" />
                        <ErrorMessage name="streetName" className="text-red-500 text-sm" component="div" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <Field name="city" placeholder="City" className="w-full border p-2 rounded text-black" />
                        <ErrorMessage name="city" className="text-red-500 text-sm" component="div" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Home Address</label>
                      <Field name="homeAddress" placeholder="Address" className="w-full border p-2 rounded text-black" />
                      <ErrorMessage name="homeAddress" className="text-red-500 text-sm" component="div" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Customer Phone</label>
                        <Field
                          name="customerPhone"
                          placeholder="10-digit phone"
                          className="w-full border p-2 rounded text-black"
                        />
                        <ErrorMessage name="customerPhone" className="text-red-500 text-sm" component="div" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                        <Field
                          name="postalCode"
                          placeholder="6-digit PIN"
                          className="w-full border p-2 rounded text-black"
                        />
                        <ErrorMessage name="postalCode" className="text-red-500 text-sm" component="div" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Proceed to Payment
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Payment;
