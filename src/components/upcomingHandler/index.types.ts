import { IParticipant } from "@/redux/api/participants";
import { StaticImageData } from "next/image";

export interface UpcomingProps {
    image:StaticImageData | string;
    title:string;
    location:string;
    number?: number;
    id?:string
    data: IParticipant[]
}