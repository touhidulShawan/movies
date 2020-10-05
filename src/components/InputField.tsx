import * as React from "react";
import { FieldAttributes, useField } from "formik";

type FieldProps = {
  label: string;
} & FieldAttributes<{}>;

const InputField: React.FC<FieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div className="form-group">
      <label htmlFor="name">{label}</label>
      <input
        id={field.name}
        name={field.name}
        value={props.value}
        onChange={field.onChange}
        type={props.type}
        onBlur={field.onBlur}
        className="form-control mb-2"
      />
      {errorText !== "" ? (
        <div className="alert alert-danger">{errorText}</div>
      ) : null}
    </div>
  );
};

export default InputField;
