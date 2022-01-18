import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      // USER NAME
      username: Yup.string()
        .required("Please enter your username")
        .min(4, "Must be 4 characters or more"),
      //PASSWORD
      password: Yup.string()
        .required("Please enter your password")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,14}$/,
          "Password must be 8-14 characters and contain at least one letter, one number and a special character"
        ),
    }),
    onSubmit: (values) => {
      window.alert("Form submitted");
      console.log(values);
    },
  });

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label> Username </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Enter username"
        />
        {formik.errors.username && (
          <p className="errorMessage"> {formik.errors.username} </p>
        )}

        <label> Password </label>
        <input
          type="text"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && (
          <p className="errorMessage"> {formik.errors.password} </p>
        )}
        <button type="submit"> Submit </button>
      </form>
    </section>
  );
};

export default Login;
