import React from 'react'
import groupImage from '@/assets/images/Group.png'
import Image from 'next/image'
import { Button } from 'antd'
import styles from "./style.module.css"
export default function DisplayModal() {
  return (
    <div className={styles.mainContainer}>
        <div className={styles.firstContainer}>
            <div>
                <Image src={groupImage} alt='image' width={56} height={24}/>
            </div>
            <div>
                <p>+20 Going</p>
            </div>
        </div>
        <div>
            <Button 
                 style={{
                    backgroundColor:"#5669FF",
                    padding:"18px 18px",
                    color:"#fff",
                    fontSize:"16px",
                    cursor:"pointer",
                    borderRadius:"12px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}
                >
                Invite
            </Button>
        </div>
    </div>
  )
}
