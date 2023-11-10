import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import useForm from "../hooks/forman/useForm";
import * as yup from "yup";
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
  const [formField, setFormField]: any = useState({});
  const initialValues = {
    username: "aliam",
    password: "someRandomPass",
    accept: true,
    select: "meat",
    platform: "mac",
  };

  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  const finalSubmit = (values: any) => {
    console.log(values);
  };

  const finalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // setFormField((prevValues: any) => ({
    //   ...prevValues,
    //   [name]: value,
    // }));

    console.log(formField, "finalChange");
  };

  const { register, handleSubmit, errors, withRef } = useForm(
    initialValues,
    validationSchema
  );
  // const { register } = useForm(initialValues, validationSchema);

  return (
    <div className="froman">
      <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper">
        {/* <form onSubmit={finalSubmit}> */}
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
            type="text"
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
          {errors.accept && (
            <span className="alert">{errors.accept}</span>
          )}
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
        {String(renderCount.current)}
      </form>
    </div>
  );
};

export default MyForm;
