import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { Home } from "./Home/Home";
import { NavBar } from "./NavBar/NavBar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar></NavBar>
    <Home></Home>
  </ChakraProvider>
);
