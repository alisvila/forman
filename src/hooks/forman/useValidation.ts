import { useCallback, useState } from "react";
import { Exception, FormErrors, ValidationSchema, finalObject } from "./types";

const useValidation = ( validationSchema?: ValidationSchema) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const removeError = useCallback((name: string) => {

    if (errors[name] !== '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

  },[errors])

  const addError = useCallback((name: string, error: Exception) => {

    if (errors[name] !== error.message) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  },[errors])

  const validateField = useCallback(async (name: string, value: string | boolean) => {
    const schema = validationSchema.fields[name];
    if (!schema) return '';

    schema.validate(value).then(() => {
      removeError(name)
    })
    .catch((error: Exception) => {
      addError(name, error)
    })
  }, [validationSchema, addError, removeError]);

  const validateAll = async (finalValues: finalObject) => {
    const validationErrors: FormErrors = {};
    const validationPromises: Promise<void>[] = [];
    if (validationSchema) {

      Object.keys(finalValues).forEach((name: string) => {
        let value = finalValues[name]
        const schema = validationSchema.fields[name];
        if (schema) {
          validationPromises.push(
            schema.validate(value)
              .then(() => {
                removeError(name)
                validationErrors[name] = '';
              })
              .catch((error: Exception) => {
                addError(name, error)
                validationErrors[name] = error.message;
              }),
          );
        }
      });

      await Promise.all(validationPromises);
    }
    return Object.values(validationErrors).some(error => error)
  }
  return {validateAll, validateField, errors}
}

export default useValidation
