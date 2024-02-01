import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./DefaultLayout.module.scss";

function DefaultLayout({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className={styles.page}>
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
