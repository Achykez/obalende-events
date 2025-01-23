import React from 'react';
import AppLogo from "@/assets/images/app-logo.png";
import Image from 'next/image';
import styles from './styles.module.css';

export default function Header() {
  return (
    <div className={styles.mainContainer}>
      {/* Logo */}
      <Image src={AppLogo} alt="App Logo" width={80} height={80} />
    </div>
  );
}
