import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { GoDotFill } from "react-icons/go";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Clock } from "lucide-react";
import { Class, TableComponentProps } from "@/interface/InterfaceItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ConfirmModal from "./ConfirmModal"; 

const TableComponent: React.FC<TableComponentProps> = ({ classes, showBookedOnly }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);

    const sortedClasses = classes
        .filter(cls => !showBookedOnly || cls.status === 'booked')
        .sort((a, b) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime());

    const handleJoinClick = (cls: Class) => {
        setSelectedClass(cls);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedClass(null);
    };

    const handleConfirmJoin = () => {
        if (selectedClass) {
            // Handle join logic here
            console.log(`Joined class: ${selectedClass.className}`);
        }
        setModalOpen(false);
        setSelectedClass(null);
    };

    return (
        <>
            <Table>
                <TableHeader className="bg-neutral-100">
                    <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead className="ps-14">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedClasses.map((cls, index) => {
                        const scheduleDate = new Date(cls.schedule);
                        const now = new Date();
                        const isLive = scheduleDate <= now && now <= new Date(scheduleDate.getTime() + 60 * 60 * 1000); 
                        const isToday = scheduleDate.toDateString() === now.toDateString();
                        const formattedTime = scheduleDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                        const formattedDate = isToday
                            ? `Today ${formattedTime}`
                            : `${scheduleDate.getDate()} ${scheduleDate.toLocaleString('default', { month: 'long' })} ${formattedTime}`;

                        const timeUntilLive = Math.max(0, scheduleDate.getTime() - now.getTime());
                        const daysUntilLive = Math.floor(timeUntilLive / (1000 * 60 * 60 * 24));
                        const [hours, minutes, seconds] = [
                            Math.floor((timeUntilLive / (1000 * 60 * 60)) % 24),
                            Math.floor((timeUntilLive / (1000 * 60)) % 60),
                            Math.floor((timeUntilLive / 1000) % 60),
                        ];
                        return (
                            <TableRow  key={cls.id}>
                                <TableCell className='transition-all duration-300'>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h1 className="text-gray-500 text-xs">{index + 1}</h1>
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold">{cls.className}</h1>
                                            <h1>{isLive ? (<span className="text-red-500 flex font-bold items-center gap-0.5"> <GoDotFill className="" /> Live</span>) : (<span className="text-xs text-gray-500">{formattedDate}</span>)}</h1>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage className="object-cover" src={cls.image} alt={cls.instructor} />
                                            <AvatarFallback>{cls.instructor.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{cls.instructor}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-bold">
                                    {cls.status === "booked" && !isLive ? (
                                        daysUntilLive > 1 ? (
                                            <span className="text-xs text-gray-500 flex items-center justify-center gap-2">
                                                {daysUntilLive} days<Clock/>
                                            </span>
                                        ) : (
                                            <span className="text-xs text-blue-500 flex items-center justify-center gap-2">
                                                {hours}:{minutes}:{seconds} <Clock/>
                                            </span>
                                        )
                                    ) : isLive ? (
                                        <Button className="bg-blue-500 w-[110px] h-[36px] hover:bg-blue-700  duration-300 hover:border text-white gap-2" onClick={() => handleJoinClick(cls)}>
                                            Join Now <FaExternalLinkAlt className="w-5" />
                                        </Button>
                                    ) : (
                                        <Button className="bg-white border w-[110px] h-[36px] text-black gap-2 hover:bg-black hover:text-white duration-300">
                                            Book Now
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <ConfirmModal open={modalOpen} onClose={handleCloseModal} onConfirm={handleConfirmJoin} />
        </>
    );
}

export default TableComponent;
