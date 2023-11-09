import { createRef } from 'react';
import _debounce from 'lodash/debounce';
import { InputRefs, finalObject } from './types';


const addInputRef = (name: string, inputRefs: InputRefs) => { 
  if (inputRefs.current[name]) return inputRefs.current[name]
  inputRefs.current[name] = createRef();
  return inputRefs.current[name]
};

const withDebounce = (fn: any, time: number) => {
  return _debounce(fn, time);
};

const removeRef = (inputRefs: InputRefs ) => {
  let obj: finalObject = {}
  let objKeys = Object.keys(inputRefs.current)
  
  objKeys.map(item => {
    obj[item] = inputRefs.current[item].current.type === "checkbox" ? inputRefs.current[item].current.checked : inputRefs.current[item].current.value
  })
  return obj
}

export {addInputRef, removeRef, withDebounce}