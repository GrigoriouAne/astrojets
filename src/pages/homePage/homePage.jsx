import styles from "./homePage.module.css";

import HomeBanner from "../../components/homeBanner/homeBanner";
const HomePage = () => {
  return (
    <>
      <div>
        <HomeBanner />
        <Pricing />
      </div>
    </>
  );
};

const Pricing = () => {
  return <div id="pricing"></div>;
};

export default HomePage;
