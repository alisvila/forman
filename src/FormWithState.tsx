import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import useForm from "./hooks/forman/useForm";

const MyForm = () => {
  const [formField, setFormField]: any = useState({});
  const initialValues = {
    username: "abbas",
    password: "filan",
    moreDetail: true,
    select: "meat",
    platform: "windows",
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
  );
  // const { register } = useForm(initialValues, validationSchema);

  useEffect(() => {
    console.log("use effect inside fucking component");
  }, [register, handleSubmit, errors, withRef]);

  return (
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
      <div>
        <label htmlFor="windows">windows</label>
        <input
          id="windows"
          {...withRef("platform", { type: "radio", value: "mac" })}
        />
        <label htmlFor="mac">mac</label>

        <input
          id="mac"
          {...withRef("platform", { type: "radio", value: "mac" })}
        />
      </div>

      <div>
        {/* <label htmlFor="with-state">with state</label>
        <input
          id="with-state"
          placeholder="with state"
          type="text"
          {...register("withState")}
        /> */}
        {/* {errors.password && <span>{errors.password}</span>} */}
      </div>

      <button type="submit">Submit</button>
      <br></br>
      {String(renderCount.current)}
    </form>
  );
};

export default MyForm;
