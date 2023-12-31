import { BaseSyntheticEvent, ChangeEvent, RefObject } from "react";
import { AnyObjectSchema, InferType } from "yup";

type FormValues = {
  [key: string]: InputValue;
};

type FormErrors = {
  [key: string]: string;
};

type FinalObject = {
  [key: string]: InputValue;
};

type InputValue = string | number | boolean;

type InputRef = RefObject<HTMLInputElement>;

type SubmitHandler<T extends FormValues> = (
  values: T,
  event?: BaseSyntheticEvent
) => unknown | Promise<unknown>;

type SubmitForm = (
  fn: SubmitHandler<FormValues>
) => (event: ChangeEvent<HTMLFormElement>) => Promise<void>;

type ChangeForm = (
  event: ChangeEvent<HTMLInputElement>,
  fn?: (event: ChangeEvent<HTMLInputElement>) => void
) => void;

type FormHandlers = {
  handleChange: ChangeForm;
  handleSubmit: SubmitForm;
  errors: FormErrors;
  register: FormRegister;
  withRef: FormRegister;
};

type ValidationSchema = InferType<AnyObjectSchema>;

type FormOptions = Partial<{
  name: string;
  required: boolean;
  min: number | string;
  max: number | string;
  maxLength: number;
  minLength: number;
  onChange: (event: any) => void;
  disabled: boolean;
  validationSchema?: ValidationSchema;
  type: string;
  value: string;
}>;

type InputRefs = {
  current: {
    [key: string]: RefObject<any>;
  };
};

type RadioRefs = {
  current: {
    [key: string]: { [key: string]: RefObject<any> };
  };
};

type FormRegister = (name: string, options?: FormOptions) => FormOptions;

export type {
  RadioRefs,
  InputRefs,
  FormOptions,
  ValidationSchema,
  FormHandlers,
  FinalObject,
  FormErrors,
  FormValues,
  FormRegister,
  SubmitForm,
  ChangeForm,
  InputRef,
  InputValue
};
