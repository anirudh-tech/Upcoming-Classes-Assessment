import Assignments from "@/components/dashboard/Assignments"
import CardMobile from "@/components/dashboard/CardMobile";
import Navbar from "@/components/dashboard/Navbar"
import TableComponent from "@/components/dashboard/TableComponent"
import { Checkbox } from "@/components/ui/checkbox"
import { Class } from "@/interface/InterfaceItem";
import { useState } from "react";
import instructor1 from "@/assets/instructor1.jpeg"
import instructor2 from "@/assets/instructor2.jpeg"
import instructor3 from "@/assets/instructor3.png"
import instructor4 from "@/assets/instructor4.png"
import instructor5 from "@/assets/instructor5.png"
import instructor6 from "@/assets/instructor6.png"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const classes: Class[] = [
  {
    id: 1,
    className: "Math 101",
    instructor: "Mr. Smith",
    schedule: "2024-08-10T09:00:00",
    status: "booked",
    image: instructor1
  },
  {
    id: 2,
    className: "Science 201",
    instructor: "Ms. Johnson",
    schedule: "2024-08-10T10:45:00",
    status: "available",
    image: instructor2
  },
  {
    id: 3,
    className: "History 301",
    instructor: "Dr. Brown",
    schedule: "2024-08-11T13:00:00",
    status: "available",
    image: instructor3
  },
  {
    id: 4,
    className: "Art 101",
    instructor: "Ms. White",
    schedule: "2024-08-12T14:15:00",
    status: "booked",
    image: instructor4
  },
  {
    id: 5,
    className: "Music 101",
    instructor: "Mr. Green",
    schedule: "2024-08-13T15:30:00",
    status: "available",
    image: instructor5
  },
  {
    id: 6,
    className: "Physics 201",
    instructor: "Dr. Black",
    schedule: new Date().toISOString(),
    status: "booked",
    image: instructor6
  },
];

const Dashboard = () => {
  const [showBookedOnly, setShowBookedOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(6);

  // Calculate the number of pages
  const filteredClasses = classes.filter(cls => !showBookedOnly || cls.status === 'booked');
  const totalPages = Math.ceil(filteredClasses.length / resultsPerPage);

  // Calculate the classes to display on the current page
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentClasses = filteredClasses.slice(startIndex, startIndex + resultsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (count: number) => {
    setResultsPerPage(count);
    setCurrentPage(1); // Reset to the first page when changing results per page
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="bg-white pl-[10px] md:pl-[35px] py-2 border-l-2">
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>

        {/* upcoming classes */}
        <div className="md:grid hidden grid-cols-2 p-3 gap-3">
          <div className="bg-white rounded-md p-3 min-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[565px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-semibold">Upcoming classes</h1>
                <h1 className="text-xs text-gray-600">For next 7 days</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-600 text-sm">Booked only</h1>
                <Checkbox
                  checked={showBookedOnly}
                  onCheckedChange={(checked: boolean) => setShowBookedOnly(checked)}
                />
              </div>
            </div>
            <div className="pt-3 md:block hidden">
              {/* table start */}
              <TableComponent classes={currentClasses} showBookedOnly={showBookedOnly} />
              {/* table end */}
            </div>
          </div>
          {/* Assignments */}
          <div className="bg-white rounded-md md:block hidden p-3 h-[570px]">
            <Assignments />
          </div>
        </div>

        {/* upcoming classes mobile view */}
        <div className="md:hidden">
          <div className="rounded-md p-3 min-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[570px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-semibold">Upcoming classes</h1>
                <h1 className="text-xs text-gray-600">For next 7 days</h1>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-600 text-sm">Booked only</h1>
                <Checkbox
                  checked={showBookedOnly}
                  onCheckedChange={(checked: boolean) => setShowBookedOnly(checked)}
                />
              </div>
            </div>
            <div className="pt-4 md:hidden block">
              {/* table start */}
              <CardMobile classes={currentClasses} showBookedOnly={showBookedOnly} />
              {/* table end */}
            </div>
          </div>
          {/* Assignments */}
          <div className="bg-white rounded-md md:block hidden p-3 h-[570px]">
            <Assignments />
          </div>
        </div>

        {/* Pagination */}
        <div className="md:flex justify-between w-1/2 hidden">
          <div className="flex justify-start items-start">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    isActive={currentPage > 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(i + 1)}
                      isActive={i + 1 === currentPage}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    isActive={currentPage < totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="flex gap-2 items-center">
            <h1>Results per page</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border px-2">{resultsPerPage}</DropdownMenuTrigger>
              <DropdownMenuContent>
                {[6, 10, 15, 20, 25].map(count => (
                  <DropdownMenuItem key={count} onClick={() => handleResultsPerPageChange(count)}>
                    {count}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
