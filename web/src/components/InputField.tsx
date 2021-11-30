// import React, { InputHTMLAttributes } from "react";
// import { useField } from "formik";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   FormErrorMessage,
//   Textarea,
// } from "@chakra-ui/react";

// // says that you want the input field to take in any props that a regular input field wouldn't
// type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
//   name: string;
//   textarea?: boolean;
// };

// export const InputField: React.FC<InputFieldProps> = ({
//   label,
//   textarea,
//   size: _,
//   ...props
// }) => {
//   let InputOrTextarea = Input;
//   if (textarea) {
//     InputOrTextarea = Textarea;
//   }
//   const [field, { error }] = useField(props);
//   return (
//     // !! converts it to a boolean true or false
//     // '' => false
//     // 'error message whatever' => true
//     <FormControl isInvalid={!!error}>
//       <FormLabel htmlFor={field.name}>{label}</FormLabel>
//       <InputOrTextarea {...field} {...props} id={field.name} />
//       {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
//     </FormControl>
//   );
// };

import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea === Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
