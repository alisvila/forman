import { createRef } from "react";
import _debounce from "lodash/debounce";
import type { InputRefs, RadioRefs, finalObject } from "./types";

const addInputRef = (name: string, inputRefs: InputRefs) => {
  if (inputRefs.current[name]) return inputRefs.current[name];
  inputRefs.current[name] = createRef();
  return inputRefs.current[name];
};

const addRadioRef = (name: string, inputRefs: RadioRefs, value?: string) => {
  if (!inputRefs.current[name]) inputRefs.current[name] = {};
  if (value) {
    return (inputRefs.current[name][value] = createRef());
  }
};

const withDebounce = (fn: any, time: number) => {
  return _debounce(fn, time);
};

const removeRef = (inputRefs: InputRefs) => {
  let obj: finalObject = {};
  let objKeys = Object.keys(inputRefs.current);

  objKeys.map((item) => {
    obj[item] =
      inputRefs.current[item].current.type === "checkbox"
        ? inputRefs.current[item].current.checked
        : inputRefs.current[item].current.value;
  });

  return obj;
};

const removeRefRadio = (inputRefs: RadioRefs) => {
  let obj: finalObject = {};
  let objKeys = Object.keys(inputRefs.current);

  Object.keys(objKeys).map((item: any) => {
    Object.values(inputRefs.current[objKeys[item]]).map((key: any) => {
      if (key.current && key.current.checked) {
        obj[objKeys[item]] = key.current.value;
      }
    });
  });
  return obj;
};

export { addInputRef, addRadioRef, removeRef, removeRefRadio, withDebounce };
