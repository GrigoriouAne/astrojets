import styles from "./homePage.module.css";

import HomeBanner from "../../components/homeBanner/homeBanner";
import OurPackagesSection from "../../sections/ourPackagesSection/ourPackagesSection";
import AboutUsSection from "../../sections/aboutUsSection/aboutUsSection";
import ContactUsSection from "../../sections/contactUsSection/contactUsSection";

const HomePage = () => {
  return (
    <>
      <div>
        <HomeBanner id="home" />
        <OurPackagesSection />
        <AboutUsSection />
        <ContactUsSection />
      </div>
    </>
  );
};

export default HomePage;
