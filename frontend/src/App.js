import React from 'react';
import Signup from './components/SignupForm/Signup';
import Login from './components/LoginForm/Login';
import { Route, Routes } from 'react-router-dom';
import SideWallpaper from './components/sidewallpaper/SideWallpaper';
import styles from './app.module.css';
// import { useSelector } from "react-redux";

import {
  ChakraProvider,
  Box,
  // Text,
  // VStack,
  // Code,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className={styles.frontpage}>
        {/* <Grid minH="100vh" p={3}> */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Routes>
          <Route path="/" element={<SideWallpaper />}>
            <Route index element={<Signup />} />
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
        {/* </Grid> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
