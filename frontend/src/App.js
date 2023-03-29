import React from 'react';
import Signup from './components/SignupForm/Signup';
import Login from './components/LoginForm/Login';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  // Routes,
} from 'react-router-dom';

import RequireUser from './components/AuthGuard/requireUser';

// Front Page for layout [shared layout]
import SideWallpaper from './components/sidewallpaper/SideWallpaper';

// Shared layout for main page it acts as top navbar
import Topnav from './components/Main/TopNav/Topnav';
import styles from './app.module.css';
// import { useSelector } from "react-redux";

import {
  ChakraProvider,
  // Box,
  // Text,
  // VStack,
  // Code,
  // Grid,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from './theme';
import Profile from './components/Main/ProfilePage/Profile';
import Dashboard from './components/Main/Dashboard/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SideWallpaper />}>
        <Route index element={<Signup />} />
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route
        path="/app"
        element={
          <RequireUser>
            <Topnav />
          </RequireUser>
        }
      >
        <Route
          index
          element={
            <RequireUser>
              <Dashboard />
            </RequireUser>
          }
        />
        <Route
          path="profile"
          element={
            <RequireUser>
              <Profile />
            </RequireUser>
          }
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className={styles.frontpage}>
        {/* <Grid minH="100vh" p={3}> */}
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <RouterProvider router={router} />
        {/* </Grid> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
