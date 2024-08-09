import { IAssignmentComponentInterface } from "@/interface/InterfaceItem"

const AssignmentComponent = ({name, deadline}: IAssignmentComponentInterface) => {
  return (
    <div className="border-2 rounded-md flex flex-col p-2" >
        <h1 className="font-semibold text-sm">{name}</h1>
        <h1 className="text-sm text-gray-500">Deadline <span className="my-6">.</span> <span>{new Date(deadline).toLocaleDateString()}</span></h1>
    </div>
  )
}

export default AssignmentComponent