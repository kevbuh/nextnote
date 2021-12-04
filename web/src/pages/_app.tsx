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
import { Fonts } from "./font";

const theme = extendTheme({
  fonts: {
    component: "Open Sans",
    body: "Raleway",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
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
