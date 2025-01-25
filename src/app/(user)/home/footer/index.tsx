import React from 'react';
import styles from "./styles.module.css";
import { WEBSITE_DETAILS } from '@/config';

export default function Footer() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>Contact Info</h2>
        <div>
          <p>{WEBSITE_DETAILS.address}</p>
          <p>Email: <strong>{WEBSITE_DETAILS.email}</strong></p>
          <p>
            Phone: <strong>{WEBSITE_DETAILS.phoneNumber}</strong> | WhatsApp: <strong>{WEBSITE_DETAILS.whatsappN0}</strong>
          </p>
        </div>
      </div>
      {/* <div className={styles.secondFooterContainer}>
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
      </div> */}
    </div>
  );
}
