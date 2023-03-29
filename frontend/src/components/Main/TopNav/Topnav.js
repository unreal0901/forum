import React from 'react';
import { Outlet } from 'react-router-dom';

const Topnav = () => {
  return (
    <>
      <div>Topnav</div>
      <Outlet />
    </>
  );
};

export default Topnav;
