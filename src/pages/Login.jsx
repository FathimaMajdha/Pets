import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginUser } from "./LoginSlice";
import { useAuth } from "../Features/AuthContext";
import BackHeader from "../Components/BackHeader";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.login);
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(fetchLoginUser(values));

    if (fetchLoginUser.fulfilled.match(result)) {
      const flatUser = result.payload;
      await login(flatUser);

      toast.success("Login successful!", { autoClose: 200 });

      setTimeout(() => {
        if (flatUser.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 200);
    } else {
      toast.error(result.payload || "Login failed.");
    }
  };

  return (
    <div>
      <BackHeader title="Back" />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className=" bg-white backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 w-[90%] max-w-md text-center border border-white border-opacity-20">
          <div className="text-gray-800 text-4xl font-bold font-devonshire mb-2">PetsFood</div>
          <h3 className="text-gray-800 text-lg font-medium mb-6">Enter your login credentials</h3>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label className="block text-left text-gray-800 font-semibold mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="block w-full px-4 py-2 mb-2 rounded-md bg-white  text-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your email"
                autoComplete="current-email"
              />
              <ErrorMessage name="email" component="p" className="text-red-400 text-left text-sm mb-4" />

              <label className="block text-left text-gray-800 font-semibold mb-1 mt-4">Password</label>
              <Field
                type="password"
                name="password"
                className="block w-full px-4 py-2 mb-2 rounded-md bg-white  text-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <ErrorMessage name="password" component="p" className="text-red-400 text-left text-sm mb-4" />

              <button
                type="submit"
                className={`mt-4 w-full py-3 rounded-md text-white font-semibold transition-transform duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:scale-105 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
              </button>

              {error && <p className="text-red-400 mt-2">{error}</p>}
            </Form>
          </Formik>

          <p className="mt-6 text-gray-800 text-sm">
            Not registered?{" "}
            <span
              className="text-indigo-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
