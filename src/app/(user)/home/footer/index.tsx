import React from 'react';
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>Contact Info</h2>
        <div>
          <p>Plot 19, Zone l, Banana Island, Ikoyi, Lagos</p>
          <p>Email: <strong>care@obalende.com.ng</strong></p>
          <p>
            Phone: <strong>09093473832</strong> | WhatsApp: <strong>09056537438</strong>
          </p>
        </div>
      </div>
      <div className={styles.secondFooterContainer}>
        <div>
          <h2>About Obalende</h2>
          <div>
            <p>Corporate Information</p>
            <p>The Executive Team</p>
            <p>ISO Policy</p>
            <p>Environmental Policy</p>
          </div>
        </div>
        <div>
          <h2>Helpful Links</h2>
          <div>
            <p>Whistle Blower</p>
            <p>Fraud Alert</p>
            <p>Unsolicited Proposals</p>
            <p>Buy Airtime/Data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
