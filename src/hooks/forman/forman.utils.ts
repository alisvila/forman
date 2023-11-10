import { createRef } from "react";
import _debounce from "lodash/debounce";
import type {
  InputRefs,
  RadioRefs,
  FinalObject,
  InputValue
} from "./forman.types";

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
  const obj: FinalObject = {};
  const objKeys = Object.keys(inputRefs.current);

  objKeys.map((item) => {
    const { type, checked, value } = inputRefs.current[item].current;
    obj[item] = inputTypeValue(type, checked, value);
  });

  return obj;
};

const removeRadioRef = (inputRefs: RadioRefs) => {
  const obj: FinalObject = {};
  const objKeys = Object.keys(inputRefs.current);

  Object.keys(objKeys).map((item: any) => {
    Object.values(inputRefs.current[objKeys[item]]).map((key: any) => {
      if (key.current && key.current.checked) {
        obj[objKeys[item]] = key.current.value;
      }
    });
  });
  return obj;
};

const inputTypeValue = (type: string, checked: boolean, value: InputValue) => {
  let inputValue;
  switch (type) {
    case "checkbox":
      inputValue = checked;
      break;
    case "number":
      inputValue = +value;
      break;

    default:
      inputValue = value;
      break;
  }

  return inputValue;
};

export {
  addInputRef,
  addRadioRef,
  removeRef,
  removeRadioRef,
  withDebounce,
  inputTypeValue
};
