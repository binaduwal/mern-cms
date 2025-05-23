import InputField from "../../reusables/InputField";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAddItemMutation } from "../../app/services/QuerySettings";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Minimum 6 characters")
    .required("Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [addItem, { isLoading }] = useAddItemMutation();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await addItem({
          url: "/auth/login",
          data: values,
        }).unwrap();

        const { token, user } = response;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", user.role);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 300,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          onClose: () => navigate("/admin"), 
        });
      } catch (err) {
toast.error(err?.data?.message || "Login failed", {
          position: "top-center",
          autoClose: 3000,
        });      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-indigo-600 text-center w-full">Admin Login</h2>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm text-indigo-500 bg-transparent hover:text-indigo-700 transition"
          >
            <FaArrowLeft className="mr-1 "/> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            type="email"
            autoComplete="email"
            error={touched.email && errors.email ? errors.email : ""}
          />

          <InputField
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            error={touched.password && errors.password ? errors.password : ""}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    <ToastContainer />

    </div>
  );
};

export default AdminLogin;
