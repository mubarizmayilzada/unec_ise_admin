import React, { useState, useEffect } from "react";
import RedirectIconSrc from "../../assets/img/welcomeredirect.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const AcademicProgramsUI = () => {
  const [academicPrograms, setAcademicPrograms] = useState([]);

  useEffect(() => {
    async function fetchAcademicPrograms() {
      try {
        const response = await axios.get(
          "http://test-api.com/api/v1/academicProgram"
        );
        setAcademicPrograms(response.data.academicPrograms.items);
      } catch (error) {
        console.error("Error fetching academic programs:", error);
      }
    }
    fetchAcademicPrograms();
  }, []);

  return (
    <section className="mt-[65px] ml-[60px] mb-[120px] mr-[60px]">
      <h2 className="text-[48px] text-center font-lato font-[600] leading-[60px] mb-[56px] text-[#551D3B]">
        Academic Programs
      </h2>
      <Link
        to={"/academic-programs/create"}
        className="flex justify-center mx-[auto] mb-[100px] py-[10px] px-[20px] w-[300px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>
      <div className="flex flex-col gap-[32px]">
        {academicPrograms.map((program) => (
          <Link
            to={`/academic-programs/details/${program.id}`}
            key={program.id}
            className="flex w-[100%] h-[150px]"
          >
            <img alt={program.name} src={program.file} />
            <div className="my-[24px] mx-[48px] flex flex-col gap-[12px] justify-between h-[100%]">
              <div className="flex gap-[12px] items-start flex-col ">
                <p className="text-[#551d3b] text-[24px] font-[600] leading-[30px] font-lato ">
                  {program.name}
                </p>
                <p className="text-[#1a0e15] text-[16px] font-lato font-[400] leading-[24px]">
                  {program.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AcademicProgramsUI;
