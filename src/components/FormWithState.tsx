import React from "react";
import * as yup from "yup";
import useForm from "../hooks/forman/useForm";
import { finalObject } from "../hooks/forman/types";
import "../App.css";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required.")
    .min(2, "Seems a bit short..."),
  password: yup
    .string()
    .required("Password is required.")
    .min(5, "Seems a bit short..."),
  moreDetail: yup.boolean().oneOf([true], "you must check this"),
  withState: yup
    .string()
    .required("this field required.")
    .min(5, "Seems a bit short..."),
});

const MyForm = () => {
  const initialValues = {
    username: "aliam",
    password: "someRandomPass",
    accept: true,
    select: "meat",
    platform: "mac",
    withState: ""
  };

  const finalSubmit = (values: finalObject) => {
    console.log(values);
  };

  const { register, handleSubmit, errors, withRef } = useForm(
    initialValues,
    validationSchema
  );

  return (
    <div className="froman">
      <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper">
      <h2 className="title">All at once</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...withRef("username")} />
          {errors.username && <span className="alert">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="password"
            type="password"
            {...withRef("password")}
          />
          {errors.password && <span className="alert">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="password">Select</label>
          <select {...withRef("select")}>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="meat">Meat</option>
          </select>
          {errors.select && <span className="alert">{errors.select}</span>}
        </div>
        <div>
          <label htmlFor="accept">Accept</label>
          <input type="checkbox" {...withRef("accept")} />
          {errors.accept && <span className="alert">{errors.accept}</span>}
        </div>
        <div>
          <span>Platform: </span>
          <label htmlFor="windows">windows</label>
          <input
            id="windows"
            {...withRef("platform", { type: "radio", value: "windows" })}
          />
          <label htmlFor="mac">mac</label>
          <input
            id="mac"
            {...withRef("platform", { type: "radio", value: "mac" })}
          />
        </div>

        <div>
          <label htmlFor="with-state">with state</label>
          <input
            id="with-state"
            placeholder="with state"
            type="text"
            {...register("withState")}
          />
          {errors.withState && (
            <span className="alert">{errors.withState}</span>
          )}
        </div>

        <button type="submit">Submit</button>
        <br></br>
      </form>
    </div>
  );
};

export default MyForm;
