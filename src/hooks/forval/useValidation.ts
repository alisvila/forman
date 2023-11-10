import { useCallback, useState } from "react";
import type {
  FormErrors,
  ValidationSchema,
  FinalObject,
  InputValue
} from "../forman/forman.types";

const useValidation = (validationSchema?: ValidationSchema) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const removeError = useCallback(
    (name: string) => {
      if (errors[name] !== "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: ""
        }));
      }
    },
    [errors]
  );

  const addError = useCallback(
    (name: string, error: FormErrors) => {
      if (errors[name] !== error.message) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message
        }));
      }
    },
    [errors]
  );

  const validateField = useCallback(
    async (name: string, value: InputValue) => {
      const schema = validationSchema.fields[name];
      if (!schema) return "";

      schema
        .validate(value)
        .then(() => {
          removeError(name);
        })
        .catch((error: FormErrors) => {
          addError(name, error);
        });
    },
    [validationSchema, addError, removeError]
  );

  const validateAll = async (finalValues: FinalObject) => {
    const validationErrors: FormErrors = {};
    const validationPromises: Promise<void>[] = [];

    if (validationSchema) {
      Object.keys(finalValues).forEach((name: string) => {
        const value = finalValues[name];
        const schema = validationSchema.fields[name];
        if (schema) {
          validationPromises.push(
            schema
              .validate(value)
              .then(() => {
                removeError(name);
                validationErrors[name] = "";
              })
              .catch((error: FormErrors) => {
                addError(name, error);
                validationErrors[name] = error.message;
              })
          );
        }
      });
      await Promise.all(validationPromises);
    }

    return Object.values(validationErrors).some((error) => error);
  };

  return { validateAll, validateField, errors };
};

export default useValidation;
