import React from 'react';
import styles from './styles.module.css';
import ArrowLeft from '@/assets/icons/arrowLeft';
import BackgroundImage from "@/assets/images/image 77.png";
import Image from 'next/image';

export default function KarokeHeader() {
  return (
    <div className={styles.mainContainer}>
      {/* Foreground Content */}
      <div className={styles.mainFirstContainer}>
        <div>
          <ArrowLeft />
        </div>
        <div>
          <p>Event Details</p>
        </div>
      </div>

      {/* Background Image */}
      <div className={styles.absoluteImage}>
        <Image src={BackgroundImage} alt="background-image" fill />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 33.2%, rgba(0, 0, 0, 0.65) 73.83%)",
          }}
        />
      </div>
    </div>
  );
}
