import * as React from "react";
import { Field, ErrorMessage } from "formik";

interface Props {
  label: string;
  name: string;
  option: Array<{ key: string; value: string }>;
  touched: boolean | undefined;
  error: string | undefined;
}

const Select: React.FC<Props> = (props) => {
  const { label, name, option, touched, error } = props;
  //   const [field] = useField<{}>(props);
  const errorText = error && touched ? error : "";

  return (
    <div className="form-group">
      <label htmlFor="selectItems">Select Genre</label>
      <Field as="select" name={name} id="selectItems" className="form-control">
        {option.map((val) => {
          return (
            <option key={val.key} value={val.value}>
              {val.key}
            </option>
          );
        })}
      </Field>
      {errorText ? (
        <div className="alert alert-danger mt-2">
          <ErrorMessage name={name} />
        </div>
      ) : null}
    </div>
  );
};
export default Select;
