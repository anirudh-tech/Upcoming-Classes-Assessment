import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { GoDotFill } from "react-icons/go";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Clock } from "lucide-react";
import { TableComponentProps } from "@/interface/InterfaceItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const TableComponent: React.FC<TableComponentProps> = ({ classes, showBookedOnly }) => {
    const sortedClasses = classes
    .filter(cls => !showBookedOnly || cls.status === 'booked')
    .sort((a, b) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime());
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
                        const isLive = scheduleDate <= now && now <= new Date(scheduleDate.getTime() + 60 * 60 * 1000); // Assuming class duration of 1 hour
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
                            <TableRow key={cls.id}>
                                <TableCell>
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
                                        <Button className="bg-blue-500 w-[110px] h-[36px] hover:bg-blue-700  duration-300 hover:border text-white gap-2">
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
        </>
    );
}

export default TableComponent;
