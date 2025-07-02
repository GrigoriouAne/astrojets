import styles from "./aboutUsSection.module.css";
import { useMediaQuery } from "react-responsive";
import whoAreYouImg from "../../assets/images/astrojets_who_are_you.png";
import sparkImg from "../../assets/images/spark2.png";
import speakerImg from "../../assets/images/loudspeaker.png";
const AboutUsSection = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div id={"aboutUs"} className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>About Us</h1>
      </div>
      {(isMobile || isTablet) && <MobileOrTabletComponent />}
      {isDesktop && <DeskopComponent />}
    </div>
  );
};

const MobileOrTabletComponent = () => {
  return (
    <>
      <div className={styles.contentContainer}>
        <p className={styles.text}>
          We are the AstroBoys. Two friends with opposite minds but one shared
          dream — to bring our childhood imagination to life. One boy thinks
          with logic. The other with heart. Together, they balance — just like
          on a jet ski. That’s how AstroJets was born. In Nea Peramos, Kavala,
          we don’t just rent jet skis. We create memories.
        </p>
      </div>
    </>
  );
};

const DeskopComponent = () => {
  return (
    <>
      <p className={styles.text}>
        AstroJets – Two friends, one dream, endless rides We are the AstroBoys.
        Two childhood friends who grew up on cartoons, endless summers, and the
        feeling that life’s better when you have someone next to you who
        balances you out.
      </p>
      <div className={styles.middleContainer}>
        <div className={styles.leftTextContainer}>
          <p className={styles.leftText}>
            The first boy is the voice of reason — responsible, grounded, always
            thinking ahead.
          </p>
          <img className={styles.speakerImg} src={speakerImg} />
        </div>
        <img className={styles.whoAreYouImg} src={whoAreYouImg} />
        <div className={styles.rightTextContainer}>
          <img className={styles.sparkImg} src={sparkImg} />
          <p className={styles.rightText}>
            The second boy is the spark — a dreamer, spontaneous, full of "let's
            go now!" energy.
          </p>
        </div>
      </div>
      <p className={styles.text}>
        They may seem like opposites. But that’s exactly what makes it work.
        Where one hits the brakes, the other pushes the throttle. And somewhere
        between logic and imagination, AstroJets was born — inspired by
        childhood cartoons, driven by a shared dream, and fueled by real
        friendship. Today, in Nea Peramos, Kavala, we don’t just rent out jet
        skis. We offer experiences. Memories. Stories you’ll tell at the end of
        the summer. AstroJets When imagination meets responsibility… and becomes
        a wave. 🌊
      </p>
    </>
  );
};

export default AboutUsSection;
