import { IItemInterface } from "@/interface/InterfaceItem"

const Item = ({ icon: Icon, itemName }: IItemInterface) => {
    return (
        <div className="flex items-center gap-2 ">
            <div className={`${itemName === "Dashboard" ? `bg-blue-600`: `bg-gray-200`} rounded-full p-2`}>
                <Icon width={14} height={14} className={`${itemName === "Dashboard" ? `text-white`: ``}`} />
            </div>
            <span className={`${itemName === "Dashboard" ? `font-bold`: `text-sm`}`}>{itemName}</span>
        </div>
    )
}

export default Item