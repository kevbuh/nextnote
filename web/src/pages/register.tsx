// import React from "react";
// import { Formik, Form } from "formik";
// import { Box, Button } from "@chakra-ui/react";
// import { Wrapper } from "../components/Wrapper";
// import { InputField } from "../components/InputField";
// // import { useMutation } from "urql";

// interface registerProps {}

// // const REGISTER_MUT = `mutation Register ($username: String!, $password: String!) {
// //   register(options: { username: $username, password: $password }) {
// //     errors {
// //       field
// //       message
// //     }
// //     user {
// //       id
// //       username
// //     }
// //   }
// // }`;

// const Register: React.FC<registerProps> = ({}) => {
//   // const [, register] = useMutation(REGISTER_MUT);
//   return (
//     <Wrapper variant="small">
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         onSubmit={async (values) => {
//           // const response = await register(values);
//           console.log(values);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <InputField
//               name="username"
//               placeholder="username"
//               label="Username"
//             />
//             <Box mt={4}>
//               <InputField
//                 name="password"
//                 placeholder="password"
//                 label="Password"
//                 type="password"
//               />
//             </Box>
//             <Button
//               mt={4}
//               type="submit"
//               colorScheme="teal"
//               isLoading={isSubmitting}
//             >
//               Register
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Wrapper>
//   );
// };

// export default Register;
import {
  // FormControl,
  // FormLabel,
  // Input,
  // FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
// import { Box } from "@chakra-ui/layout";

import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        {/* <NavBar /> */}
        {/* <Box textStyle="h1"></Box> */}
        {/* <Box textStyle="h2"></Box> */}
        <br />
        <Box textStyle="h2">REGISTER</Box>

        <br />
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: { options: values },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            // console.log(response);
            if (response.data?.register.errors) {
              [{ field: "username", message: "something wrong" }];
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={9}
                type="submit"
                isLoading={isSubmitting}
                // variantColor="teal"
                color="black"
                colorScheme="blue"

                // colorScheme="teal"
              >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
