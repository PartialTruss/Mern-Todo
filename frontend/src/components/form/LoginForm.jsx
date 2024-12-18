import axios from "axios";
import { Form, Formik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTasks } from "../../context/Taskcontext";
import FormLayout from "../../layout/FormLayout";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Title from "./Title";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loadTasks } = useTasks();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );

      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");
        console.log("Login successful. Redirecting to Home...");
        localStorage.setItem("authToken", response.data.token);
        loadTasks();

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error("Login failed! Please try again...");
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <FormLayout>
        <Title title_info="Login" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-8 mt-3">
              <AuthInput
                label="Email"
                placeholdertext="Enter your email"
                input_type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                icon="mail.svg"
              />
              <AuthInput
                label="Password"
                placeholdertext="Enter your password"
                input_type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                icon="lock.svg"
              />

              <AuthButton
                text={isSubmitting ? "Logging..." : "Login"}
                isdisabled={isSubmitting ? true : false}
              />
              <section className=" ml-1 text-sm opacity-50 font-semibold">
                No Account? <Link to="/signup">Create one!</Link>
              </section>
              <Toaster position="top-left" reverseOrder={false} />
            </Form>
          )}
        </Formik>
      </FormLayout>
    </div>
  );
};

export default LoginForm;
