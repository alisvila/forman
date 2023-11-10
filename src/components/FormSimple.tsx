import React from "react";
import useForm from "../hooks/forman/forman";
import type { FinalObject } from "../hooks/forman/forman.types";
import "../App.css";

const FormSimple = () => {
  const initialValues = {
    username: "filan",
    password: "bisar"
  };

  const finalSubmit = (values: FinalObject) => {
    console.log(values);
  };

  const { handleSubmit, errors, withRef } = useForm(initialValues);

  return (
    <div className="froman">
      <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper">
        <h2 className="title">Simple with default</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="username"
            type="text"
            {...withRef("username", { required: true })}
          />
          {errors.username && <span className="alert">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="password"
            type="password"
            {...withRef("password", { required: true })}
          />
          {errors.password && <span className="alert">{errors.password}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormSimple;
