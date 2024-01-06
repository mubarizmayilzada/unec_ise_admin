import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Link as RouterLink,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from React Router

const CourseUI = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7; // Set items per page to 7

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async (page) => {
      try {
        const response = await fetch(
          `http://test-api.com/api/v1/courseList?PageNumber=${page}&PageSize=${itemsPerPage}`
        );
        const data = await response.json();
        setCourses(data.course.items); // Set the courses for the current page
        setTotalPages(data.course.totalPages); // Set the total number of pages
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourses(currentPage);
  }, [currentPage]);

  // Update filteredCourses when courses or searchTerm changes
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.courceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  // Handle change in pagination
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 mb-[25px] mt-[20px]">
      <div className="flex mb-[20px] justify-between">
        <input
          type="text"
          placeholder="Search by course name..."
          className="p-2 border rounded border-[#ccc] w-[300px] outline-none"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <Link
          to={"/course/create"}
          className="py-[10px] px-[20px] w-[300px] text-center bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
        >
          Create New
        </Link>
      </div>
      <Table className="table-auto w-full text-left whitespace-no-wrap">
        <TableHead>
          <TableRow
            className="text-[white]"
            style={{ backgroundColor: "#551D3B", color: "#fff" }}
          >
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Course Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Credit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id} className="bg-white border-b">
              <TableCell className="text-[black]">
                {/* Wrap the course name in a Link component */}
                <RouterLink
                  className="text-[black]"
                  component={Link}
                  to={`/course/edit/${course.id}`}
                  style={{ color: "black" }}
                >
                  {course.courceName}
                </RouterLink>
              </TableCell>
              <TableCell>
                {" "}
                <RouterLink
                  className="text-[black]"
                  component={Link}
                  to={`/course/edit/${course.id}`}
                  style={{ color: "black" }}
                >
                  {course.credit}
                </RouterLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="secondary"
        shape="rounded"
        showFirstButton
        showLastButton
        className="my-4"
      />
    </div>
  );
};

export default CourseUI;
