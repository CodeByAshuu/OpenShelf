import React from 'react';
import styles from './MainBanner.module.css';
import mainBanner from '../assets/main banner.avif';

export default function MainBanner() {
  return (
    <section className={styles.bannerSection}>
      <img
        src={mainBanner}
        alt="A sofa, a good book, and you."
        className={styles.bannerImage}
        loading="lazy"
      />
      <div className={styles.overlay}>
        <div className={styles.textCol}>
          <h1 className={styles.heroHeading}>
            <span>A SOFA,</span><br />
            <span>A GOOD</span><br />
            <span>BOOK,</span><br />
            <span>AND YOU.</span>
          </h1>
        </div>
      </div>
    </section>
  );
} 