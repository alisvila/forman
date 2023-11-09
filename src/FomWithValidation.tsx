import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import * as yup from "yup";
import useForm from "./hooks/forman/useForm";
import "./App.css";

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
  farhad: yup
    .string()
    .required("Password is required.")
    .min(5, "Seems a bit short..."),
});

const FomWithValidation = () => {
  const initialValues = {
    username: "abbas",
    password: "filan",
    moreDetail: true,
    select: "meat",
  };

  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  const finalSubmit = (values: any) => {
    console.log(values);
  };

  const { handleSubmit, errors, withRef } = useForm(
    initialValues,
    validationSchema
  );

  return (
    <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper froman">
      <h2 className="title">
        Yup validation form
      </h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...withRef("username")}
        />
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
        <label htmlFor="password">select</label>
        <select {...withRef("select")}>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
        </select>
        {errors.select && <span className="alert">{errors.select}</span>}
      </div>
      <div>
        <label htmlFor="moreDetail">moreDetail</label>
        <input type="checkbox" {...withRef("moreDetail")} />
        {errors.moreDetail && (
          <span className="alert">{errors.moreDetail}</span>
        )}
      </div>

      <button type="submit">Submit</button>
      {String(renderCount.current)}
    </form>
  );
};

export default FomWithValidation;
