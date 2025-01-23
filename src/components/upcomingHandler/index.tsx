/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Location from '@/assets/icons/location'
// import { Typography } from '../Typography'
import Image from 'next/image'
import backgroundImage from '@/assets/images/image 84.png';
import slides from '@/assets/images/Group.png'
import styles from './styles.module.css'
import { UpcomingProps } from './index.types';

export default function UpComingHandler(props:UpcomingProps) {
const {title,image, location,number} = props;

  return (
    <div className={styles.MainContainer}>
        <div className={styles.ImageContainer}>
            <Image style={{borderRadius:"18px"}} className={styles.mainImage} src={image} alt='' fill/>
        </div>
        <div className={styles.TextContainer}>
            <div className={styles.firstTextContainer}>
                <p>{title}</p>
            </div>
            <div className={styles.secondTextContainer}>
            <Image src={slides} alt='' width={56} height={24}/>
            <p> + {number} going</p>
            </div>
            <div className={styles.thirdTextContainer}>
            <Location/>
            <p>{location}</p>
            </div>
        </div>
    </div>
  )
}
