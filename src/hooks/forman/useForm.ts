import React, { useState, ChangeEvent, FormEvent, useRef, RefObject, useCallback, useEffect, createRef } from 'react';
import type {InputRefs, ValidationSchema, FormHandlers, finalObject, FormErrors, FormValues, FormRegister } from './types'
import {addInputRef, removeRef} from './utils'
import useValidation from './useValidation';

const useForm = (initialValues: FormValues, validationSchema?: ValidationSchema): FormHandlers => {

  const [values, setValues] = useState<FormValues>(initialValues);
  const {validateAll, validateField, errors} = useValidation(validationSchema)
  const inputRefs: InputRefs = useRef({});
  // const radioRefs: InputRefs = useRef({});
  
  useEffect(() => {
    if (Object.keys(initialValues).length > 0 && Object.keys(inputRefs.current).length > 0) {
      Object.keys(initialValues).map(item => {
        // if (Object.keys(radioRefs.current).length > 0) {
        //   radioRefs.current[String(initialValues[item])].current.checked = true
        // }
        if (inputRefs.current[item].current.type === 'checkbox') {
          inputRefs.current[item].current.checked = initialValues[item]
        }
        else {
          inputRefs.current[item].current.value = initialValues[item]
        }
      })
    }
  }, [])

  const handleWithRef = useCallback(async (
    event: ChangeEvent<HTMLInputElement>,
    fn?: (event: ChangeEvent<HTMLInputElement>) => void,
    ) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (validationSchema && validationSchema.fields[name]) {
      await validateField(name, inputValue)
    }

    if (fn) {
      fn(event);
    }
  }, [validateField, validationSchema]);

  const handleChange = useCallback(async (
    event: ChangeEvent<HTMLInputElement>,
    fn?: (event: ChangeEvent<HTMLInputElement>) => void,
  ) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    console.log(value)
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: inputValue,
    }));

    if (validationSchema) {
      await validateField(name, inputValue);
    }
    if (fn) {
      fn(event)
    }
  },[validateField, validationSchema]);

  const handleSubmit = useCallback((fn: (values: FormValues) => void) => async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("clicked")
    event.preventDefault();

    const refValues = removeRef(inputRefs)
    const finalValues = {...refValues, ...values}

    console.log(finalValues)
    const isInValid = await validateAll(finalValues)

    if (isInValid) { 
      return;
    }
    else {
      fn({...finalValues});
    }
    
  },[validateAll])

  const register: FormRegister = useCallback((name, options = {}) => {
    return {
      name,
      required: !!options.required,
      min: options.min,
      max: options.max,
      maxLength: options.maxLength,
      minLength: options.minLength,
      disabled: !!options.disabled,
      onChange: (e) => handleChange(e),
      value: options.value
    };
  }, [handleChange]);


  const withRef: FormRegister = useCallback((name, options = {}) => {

    return {
      name,
      required: options.required,
      ref: addInputRef(name, inputRefs),
      onChange: (e) => handleWithRef(e, options.onChange),
    };
  }, [handleWithRef]);

  return { register, handleChange, handleSubmit, values, errors, withRef };
};

export default useForm;
