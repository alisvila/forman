import React from "react";
import FomrSimple from "./components/FormSimple";
import FomWithValidation from "./components/FomWithValidation";
import FormMaterial from "./components/FormMaterial";
import FormWithState from "./components/FormAllAtOnce";

export default function App() {
  return (
    <div className="container">
      <FomrSimple />
      <FomWithValidation />
      <FormMaterial />
      <FormWithState />
    </div>
  );
}
