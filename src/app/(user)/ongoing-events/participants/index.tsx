import React from 'react'
import styles from './style.module.css';
import { Button } from 'antd';
import { Container } from '@/app/(admin)/styled-component';
import smallImage from "@/assets/images/image 86.png"
import Image from 'next/image';
import { ParticipantsProps } from './index.types';


export default function Participants(props:ParticipantsProps) {

    const {image, NOV, name,alias} = props
    
  return (
    <div className={styles.mainContainer}>
        <div className={styles.ImageContainer}>
            <Image src={image} alt='smallImage' style={{position:"absolute", borderRadius:"10px"}} fill />
        </div>
        <div className={styles.DetailsContainer}>
            <div>
                <h2 className={styles.header}>
                    {name}
                </h2>
            </div>
            <div>
                <span style={{display:"flex", alignItems:"center", gap:"10px"}}><p>{`a.k.a : ${alias}`}</p></span>
            </div>
            <div className={styles.voteContainer} style={{display:"flex",flexDirection:"column", alignItems:"flex-start",gap:"2px", width:"100%"}}>
                <div>
                    vote : {NOV}
                </div>
                <div>
                    <Button  style={{
                            backgroundColor:"#5669FF",
                            padding:"12px 12px",
                            color:"#fff",
                            fontSize:"16px",
                            cursor:"pointer",
                            borderRadius:"12px",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                        vote for tony
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
