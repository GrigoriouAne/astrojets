import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import styles from "./layout.module.css";
import MobileNavBar from "../components/mobileNavBar/mobileNavBar";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <MobileNavBar />
    </div>
  );
}
