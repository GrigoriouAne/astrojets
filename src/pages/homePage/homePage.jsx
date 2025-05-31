import styles from "./homePage.module.css";

import HomeBanner from "../../components/homeBanner/homeBanner";
const HomePage = () => {
  return (
    <>
      <div>
        <HomeBanner />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default HomePage;
