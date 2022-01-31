import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { Home } from "./Pages/Home/Home";
import { NavBar } from "./Pages/NavBar/NavBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar></NavBar>
    <Home></Home>
  </ChakraProvider>
);
