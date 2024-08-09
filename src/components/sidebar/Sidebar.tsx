import { ChartNoAxesColumnIncreasing, FileText, IndianRupee, LogOut, Settings, Users } from "lucide-react"
import Items from "./Items"
import Logo from "./Logo"
import Profile from "./Profile"
import { Outlet } from "react-router-dom"
import { RiLayoutMasonryFill } from "react-icons/ri"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ProfilePic from "@/assets/profilePic.jpeg"

const iconsForMobile = [
    { icon: RiLayoutMasonryFill, ItemName: "Dashboard" },
    { icon: Users, ItemName: "All Classes" },
    { icon: FileText, ItemName: "Assignments" },
    { icon: ChartNoAxesColumnIncreasing, ItemName: "Performance" },
    { icon: Avatar, ItemName: "Profile", isProfile: true },
]

const Sidebar = () => {
    console.log("inside sidebar")
    return (
        <>
            {/* desktop start */}
            <div className="flex-col gap-6 w-[220px] h-screen ps-5 pt-5 bg-white md:flex hidden">
                <div>
                    {/* logo start */}
                    <Logo />
                    {/* logo end */}
                </div>
                <div>
                    {/* profile start */}
                    <Profile />
                    {/* profile end */}
                </div>
                <div className="border-t-2">
                    {/* Items */}
                    <Items />
                </div>
                <div className="absolute left-0 bottom-0 h-28 bg-white px-5">
                    <div className="flex gap-3 items-center w-full">
                        <div
                            className="h-10 gap-2 border flex items-center px-3 rounded-full bg-slate-50 shadow-md cursor-pointer"
                        >
                            <LogOut className="w-5" />
                        </div>
                        <h1>Log Out</h1>
                    </div>
                </div>
            </div>
            <Outlet />
            {/* desktop end */}
            {/* mobile start */}
            <div className="fixed md:hidden bottom-0 bg-white w-full p-2">
                <div className="flex gap-6 w-full justify-center">
                    {iconsForMobile.map((item, index) => (
                        <div key={index} className="flex flex-col items-center cursor-pointer">
                            {item.isProfile ? (
                                <Avatar className="w-6 h-6">
                                    <AvatarImage className="object-cover" src={ProfilePic}/>
                                    <AvatarFallback>AN</AvatarFallback>
                                </Avatar>
                            ) : (
                                <item.icon className={`${item.ItemName === "Dashboard" ? `text-blue-600` : `text-gray-600`} w-6 h-6`} />
                            )}
                            <span className={`${item.ItemName === "Dashboard" ? `text-blue-600` : ``} text-xs mt-1`}>{item.ItemName}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* mobile end */}
        </>
    )
}

export default Sidebar