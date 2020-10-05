import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import InputField from "./InputField";
import Select from "./Select";
import { saveMovie } from "../services/fakeMovieService";

import { v4 as uuid } from "uuid";

interface Props extends RouteComponentProps<{ id: string }> {}

interface Movie {
  _id: string;
  title: string;
  genre: { _id: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
}

interface Genre {
  _id: string;
  name: string;
}

const MovieForm: React.FC<Props> = (props) => {
  const history = props.history;

  const genreOptions = [
    { key: "Select a Genre", value: "" },
    { key: "Action", value: "Action" },
    { key: "Comedy", value: "Comedy" },
    { key: "Thriller", value: "Thriller" },
  ];

  const initialValues: Movie = {
    _id: "",
    title: "",
    genre: { _id: "", name: "" },
    numberInStock: 0,
    dailyRentalRate: 0,
  };

  const formValidation = yup.object({
    title: yup.string().required().max(30),
    genre: yup.object({ name: yup.string().required("Please select a genre") }),
    numberInStock: yup.number().required().min(0).positive(),
    dailyRentalRate: yup.number().required().min(0).max(10).positive(),
  });

  return (
    <div className="col-6 m-auto mt-4 py-2">
      <h1 className="text-center my-2">Movie Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation}
        onSubmit={(data, helper: FormikHelpers<Movie>) => {
          const movie: Movie = {
            _id: uuid(),
            title: data.title,
            genre: { _id: uuid(), name: data.genre.name },
            numberInStock: data.numberInStock,
            dailyRentalRate: data.dailyRentalRate,
            publishDate: data.publishDate,
          };
          saveMovie(movie);
          helper.setSubmitting(false);
          setTimeout(() => {
            history.replace("/movies");
          }, 500);
        }}
      >
        {({ values, isValid, isSubmitting, touched, errors }) => (
          <Form>
            <Field label="Title" name="title" type="text" as={InputField} />
            <Select
              label="Select Genre"
              name="genre.name"
              option={genreOptions}
              touched={touched.genre?.name}
              error={errors.genre?.name}
            />
            <Field
              label="Number In Stock"
              name="numberInStock"
              type="number"
              as={InputField}
            />
            <Field
              label="Rate"
              name="dailyRentalRate"
              type="number"
              as={InputField}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieForm;
