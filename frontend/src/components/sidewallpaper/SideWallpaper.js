import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Sidewallpaper.module.css';
const SideWallpaper = () => {
  return (
    <>
      <div className={styles.slideshow}>slideshow</div>
      <Outlet />
    </>
  );
};

export default SideWallpaper;
