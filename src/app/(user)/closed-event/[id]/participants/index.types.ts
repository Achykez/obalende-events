import { StaticImageData } from "next/image";

export interface ParticipantsProps {
    image : StaticImageData | string;
    name:string;
    alias:string;
    NOV:number;
    id:string;
    isClosed?:boolean;
}