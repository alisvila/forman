import { useState, useRef, useCallback, useEffect } from "react";
import type {
  InputRefs,
  ValidationSchema,
  FormHandlers,
  FormValues,
  FormRegister,
  RadioRefs,
  SubmitForm,
  ChangeForm
} from "./forman.types";
import {
  addInputRef,
  addRadioRef,
  removeRef,
  removeRadioRef,
  inputTypeValue
} from "./forman.utils";
import useValidation from "../forval/useValidation";

const useForm = (
  initialValues: FormValues,
  validationSchema?: ValidationSchema
): FormHandlers => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const { validateAll, validateField, errors } =
    useValidation(validationSchema);
  const inputRefs: InputRefs = useRef({});
  const radioRefs: RadioRefs = useRef({});

  useEffect(() => {
    // add initial values
    if (
      Object.keys(initialValues).length > 0 &&
      Object.keys(inputRefs.current).length > 0
    ) {
      Object.keys(initialValues).map((item) => {
        if (
          Object.keys(radioRefs.current).length > 0 &&
          radioRefs.current[item]
        ) {
          radioRefs.current[item][String(initialValues[item])].current.checked =
            true;
        } else if (
          Object.keys(inputRefs.current).includes(item) &&
          inputRefs.current[item].current.type === "checkbox"
        ) {
          inputRefs.current[item].current.checked = initialValues[item];
        } else if (Object.keys(inputRefs.current).includes(item)) {
          inputRefs.current[item].current.value = initialValues[item];
        }
      });
    }
  }, []);

  const handleChangeWithRef: ChangeForm = useCallback(
    async (event, fn) => {
      const { name, value, type, checked } = event.target;
      const inputValue = inputTypeValue(type, checked, value);

      if (validationSchema && validationSchema.fields[name]) {
        await validateField(name, inputValue);
      }

      if (fn) {
        fn(event);
      }
    },
    [validateField, validationSchema]
  );

  const handleChange: ChangeForm = useCallback(
    async (event, fn) => {
      const { name, value, type, checked } = event.target;
      const inputValue = type === "checkbox" ? checked : value;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: inputValue
      }));

      if (validationSchema) {
        await validateField(name, inputValue);
      }
      if (fn) {
        fn(event);
      }
    },
    [validateField, validationSchema]
  );

  const handleSubmit: SubmitForm = useCallback(
    (fn) => async (event) => {
      event.preventDefault();

      const refValues = removeRef(inputRefs);
      const refRadio = removeRadioRef(radioRefs);
      const finalValues = { ...values, ...refValues, ...refRadio };
      const isInValid = await validateAll(finalValues);

      if (isInValid) {
        return;
      } else {
        fn({ ...finalValues });
      }
    },
    [validateAll, values]
  );

  const register: FormRegister = useCallback(
    (name, options = {}) => {
      return {
        name,
        required: !!options.required,
        min: options.min,
        max: options.max,
        maxLength: options.maxLength,
        minLength: options.minLength,
        disabled: !!options.disabled,
        value: options.value,
        onChange: (e) => handleChange(e)
      };
    },
    [handleChange]
  );

  const withRef: FormRegister = useCallback(
    (name, options = {}) => {
      if (options.type === "radio") {
        return {
          name,
          required: options.required,
          value: options.value,
          type: options.type,
          ref: addRadioRef(name, radioRefs, options.value),
          onChange: (e) => handleChangeWithRef(e, options.onChange)
        };
      } else {
        return {
          name,
          required: options.required,
          ref: addInputRef(name, inputRefs),
          onChange: (e) => handleChangeWithRef(e, options.onChange)
        };
      }
    },
    [handleChangeWithRef]
  );

  return { register, handleChange, handleSubmit, errors, withRef };
};

export default useForm;
