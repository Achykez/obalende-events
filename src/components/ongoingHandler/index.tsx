'use client'
import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import slides from '@/assets/images/Group.png'
import Location from '@/assets/icons/location'
import BackgroundImage from "@/assets/images/image 84.png";
import { useRouter } from 'next/navigation'

export default function OngoingHandler() {
    const router = useRouter();

const toDetailPage = () => {
    router.push('/ongoing-events');
}
  return (
    <div className={styles.MainContainer} onClick={toDetailPage}>
        <div className={styles.ImageContainer}>
            <Image style={{borderRadius:"18px"}} className={styles.mainImage} src={BackgroundImage} alt='' fill/>
        </div>
        <div className={styles.TextContainer}>
            <div className={styles.firstTextContainer}>
                <p>International Band Mu...</p>
            </div>
            <div className={styles.secondTextContainer}>
            <Image src={slides} alt='' width={56} height={24}/>
            <p> + 20 going</p>
            </div>
            <div className={styles.thirdTextContainer}>
            <Location/>
            <p>36 Guild Street London, UK </p>
            </div>
        </div>
    </div>
  )
}
