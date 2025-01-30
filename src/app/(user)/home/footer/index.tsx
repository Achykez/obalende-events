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
          <p>
            Email: 
            <a href={`mailto:${WEBSITE_DETAILS.email}`} className={styles.link}>
              <strong>{WEBSITE_DETAILS.email}</strong>
            </a>
          </p>
          <p>
            Phone: 
            <a href={`tel:${WEBSITE_DETAILS.phoneNumber}`} className={styles.link}>
              <strong>{WEBSITE_DETAILS.phoneNumber}</strong>
            </a> 
            | WhatsApp: 
            <a href={`https://wa.me/${WEBSITE_DETAILS.whatsappN0.replace(/\D/g, '')}`} className={styles.link} target="_blank" rel="noopener noreferrer">
              <strong>{WEBSITE_DETAILS.whatsappN0}</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
