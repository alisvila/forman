import { ChangeEvent } from "react";

type FormValues = {
  [key: string]: string | boolean;
}

type FormErrors = {
  [key: string]: string;
}

type finalObject = {
  [key: string] : string | boolean
  // (event: FormEvent<HTMLFormElement>, fn: (values: FormValues) => void) => void;
}

type Exception = {
  message: string
}
  
type FormHandlers = {
  handleChange: (event: ChangeEvent<HTMLInputElement>, fn: (event: ChangeEvent<HTMLInputElement>) => void) => void;
  handleSubmit: any;
  values: FormValues;
  errors: FormErrors;
  register: FormRegister;
  withRef: FormRegister;
}

type ValidationSchema = any

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
  type: string,
  value: string
}>;

type InputRefs = {
  current: {
    [key: string]: React.RefObject<any>;
  };
};

type FormRegister = (name: string, options?: FormOptions) => FormOptions;

export type {InputRefs, FormOptions, ValidationSchema, FormHandlers, finalObject, FormErrors, FormValues, FormRegister, Exception }
