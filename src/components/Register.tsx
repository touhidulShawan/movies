import * as React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import InputField from "./InputField";
import * as yup from "yup";

interface FormValues {
  email: string;
  password: string;
  profileName: string;
}
const Register: React.FC = () => {
  const initialFormValues: FormValues = {
    email: "",
    password: "",
    profileName: "",
  };

  const formValidation = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).max(15).required("Password is required"),
    profileName: yup.string().max(20).required("Please give your name"),
  });

  return (
    <div className="col-8 m-auto mt-4 py-2">
      <h1>Register Form</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={formValidation}
        onSubmit={(data, helpers: FormikHelpers<FormValues>) => {
          console.log(data);
          helpers.setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <Field label="Username" type="email" name="email" as={InputField} />
            <Field
              label="Password"
              type="password"
              name="password"
              as={InputField}
            />
            <Field
              label="Profile Name"
              type="text"
              name="profileName"
              as={InputField}
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={!(isValid || isSubmitting)}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
