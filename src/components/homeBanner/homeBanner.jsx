import styles from "./homeBanner.module.css";

export default function HomeBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.video}
          src="https://www.youtube-nocookie.com/embed/HSYBZ2MC9GU?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=HSYBZ2MC9GU&enablejsapi=1"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Background Video"
        />
      </div>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Your Catchy Title</h1>
      </div>
    </section>
  );
}
