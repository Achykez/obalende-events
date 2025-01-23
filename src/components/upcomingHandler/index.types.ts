import { StaticImageData } from "next/image";

export interface UpcomingProps {
    image:StaticImageData;
    title:string,
    location:string,
    number: number
}