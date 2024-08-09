import { SVGProps } from "react";

export interface IItemInterface {
  icon: React.FC<SVGProps<SVGSVGElement>>; 
  itemName: string;
}

export interface IAssignmentComponentInterface {
    name: string;
    deadline: Date;
}

type ClassStatus = "booked" | "available";

export interface Class {
    id: number;
    className: string;
    instructor: string;
    schedule: string;
    status: ClassStatus;
    image: string;
}
export interface TableComponentProps {
    classes: Class[];
    showBookedOnly: boolean;
  }