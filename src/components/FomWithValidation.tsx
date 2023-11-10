import React from "react";
import * as yup from "yup";
import useForm from "../hooks/forman/forman";
import type { FinalObject } from "../hooks/forman/forman.types";
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
  farhad: yup
    .string()
    .required("Password is required.")
    .min(5, "Seems a bit short...")
});

const FomWithValidation = () => {
  const initialValues = {
    username: "",
    password: "",
    moreDetail: false,
    select: "meat"
  };

  const finalSubmit = (values: FinalObject) => {
    console.log("Yup", values);
  };

  const { handleSubmit, errors, withRef } = useForm(
    initialValues,
    validationSchema
  );

  return (
    <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper froman">
      <h2 className="title">Yup validation</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
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
        <label htmlFor="select">select</label>
        <select id="select" placeholder="select" {...withRef("select")}>
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
    </form>
  );
};

export default FomWithValidation;
