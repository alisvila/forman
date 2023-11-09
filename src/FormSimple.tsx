import React from "react";
import useForm from "./hooks/forman/useForm";

const FormSimple = () => {
  const initialValues = {
    username: "filan",
    password: "bisar",
  };

  const finalSubmit = (values: any) => {
    console.log(values);
  };

  const { handleSubmit, errors, withRef } = useForm(
    initialValues,
  );

  return (
    <div className="froman">
    <form onSubmit={handleSubmit(finalSubmit)} className="form-wrapper">
      <h2 className="title">
        Simple form
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

      <button type="submit">Submit</button>

    </form>
    </div>

  );
};

export default FormSimple;
