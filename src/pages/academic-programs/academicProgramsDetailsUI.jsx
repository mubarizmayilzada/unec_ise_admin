import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AcademicProgramsDetailsUI = () => {
  const [programData, setProgramData] = useState(null);
  const [courses, setCourses] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/academicProgram/${id}`
        );
        setProgramData(response.data);
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/course/GetAllCourse/${id}`
        );
        const sortedCourses = response.data.reduce((acc, course) => {
          const categoryId = course.courseCategoryId;
          if (!acc[categoryId]) {
            acc[categoryId] = [];
          }
          acc[categoryId].push(course);
          return acc;
        }, {});
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
    fetchCourses();
  }, [id]);

  return (
    <section className="px-[60px]">
      <Link
        to={`/academic-programs/edit/${id}`}
        className="flex justify-center mx-[auto] my-[40px] py-[10px] px-[20px] w-[300px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Edit
      </Link>
      <div className="flex gap-[36px] items-center py-[24px] mb-[16px]">
        <img className="w-[136px] h-[100px]" src={programData?.file} alt="" />
        <h2 className="text-[#551D3B] text-[64px] font-[600] leading-[80px]">
          {programData?.name || "Loading..."}
        </h2>
      </div>
      <p className="text-[16px] font-[400] leading-[24px]">
        {programData?.shortDescription || "Loading..."}
      </p>
      <div className="flex justify-between gap-[32px] mt-[32px]">
        <div className="flex-1">
          <h3 className="text-[#551D3B] text-[32px] font-[600] leading-[40px] mb-[12px]">
            Double diploma programs
          </h3>
          <p className="text-[16px] font-[400] leading-[24px]">
            {programData?.doubleDiplome || "Loading..."}
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-[#551D3B] text-[32px] font-[600] leading-[40px] mb-[12px]">
            Exchange Programs
          </h3>
          <p className="text-[16px] font-[400] leading-[24px]">
            {programData?.exchangeProgram || "Loading..."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AcademicProgramsDetailsUI;
