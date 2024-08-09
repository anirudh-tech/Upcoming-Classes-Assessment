import ProfilePic from "@/assets/profilePic.jpeg"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Profile = () => {
    return (
        <>
            <Avatar>
                <AvatarImage className="object-cover" src={ProfilePic} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <h1 className="font-semibold">John Doe</h1>
                <span>Intermediate</span>
            </div>
        </>
    )
}

export default Profile