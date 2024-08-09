import { ChartNoAxesColumnIncreasing, FileText, IndianRupee, LayoutDashboard, Settings, Users } from "lucide-react"
import Item from "./Item"


const Items = () => {
    const icons = [
        { icon: LayoutDashboard, ItemName: "Dashboard" },
        { icon: Users, ItemName: "All Classes" },
        { icon: FileText, ItemName: "Assignments" },
        { icon: ChartNoAxesColumnIncreasing, ItemName: "Performance" },
        { icon: IndianRupee, ItemName: "Fee details" },
        { icon: Settings, ItemName: "Settings" }
    ]
    return (
        <div className="flex flex-col gap-5 mt-6">
            {
                icons.map((item, index) => (
                    <>
                        <Item icon={item.icon} itemName={item.ItemName} key={index} />
                    </>
                ))
            }
        </div>
    )
}

export default Items