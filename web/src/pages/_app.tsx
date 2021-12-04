// import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
// import theme from "../theme";
import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
  // Container,
  // Stack,
  // Heading,
  // Text,
} from "@chakra-ui/react";
import React from "react";
// import Fonts from "./font";

const theme = extendTheme({
  fonts: {
    component: "Menlo",
    body: "Menlo",
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      // fontSize: ["48px", "72px"],
      fontWeight: "bold",
      // lineHeight: "110%",
      // letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["26px", "28px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <Fonts /> */}
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
