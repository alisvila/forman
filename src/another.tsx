import { useEffect } from 'react';
export const InputWrapper = (props: any) => {
  // const Wrapper: any = (props: any) => {
  const { label, onChange, name, state } = props.render;

  useEffect(() => {
    console.log(label, onChange, name, state, props);
    return () => {
      console.log('unmounting'); // cleanup got invoked everytime I typed in the input
    };
  }, []);
  // }
  return props.render(props);
};
