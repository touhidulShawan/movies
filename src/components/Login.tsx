import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import InputField from "./InputField";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: FormValues = { username: "", password: "" };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const validateForm = yup.object({
    username: yup.string().required("Username is Required").max(15),
    password: yup.string().required("Password is Required").min(8).max(20),
  });

  return (
    <div className="col-8 m-auto mt-4 py-2">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validateForm}
      >
        <Form>
          <Field label="Username" type="text" name="username" as={InputField} />
          <Field
            label="Password"
            type="password"
            name="password"
            as={InputField}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;
