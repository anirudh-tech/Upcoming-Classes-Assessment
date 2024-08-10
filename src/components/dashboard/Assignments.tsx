import AssignmentComponent from "./AssignmentComponent";

const sampleAssignments = [
    {
      name: "Math Homework",
      deadline: "2024-08-10T00:00:00Z", 
    },
    {
      name: "Science Project",
      deadline: "2024-08-15T00:00:00Z",
    },
    {
      name: "History Essay",
      deadline: "2024-08-20T00:00:00Z",
    },
  ];
  
const Assignments = () => {
  return (
    <div>
        <h1 className="font-bold">Assignments</h1>
        <div className="pt-3 flex flex-col gap-2">
            {
                sampleAssignments.map((item, index) => (
                    <AssignmentComponent deadline={new Date(item.deadline)} name={item.name} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default Assignments