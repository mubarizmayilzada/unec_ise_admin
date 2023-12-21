import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Alumni = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://test-api.com/api/v1/student");
        const studentData = response.data.student.items;
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const uniqueYears = [
      ...new Set(students.map((student) => student.enterTime)),
    ];
    const formattedYears = uniqueYears.map((year) => ({
      key: year,
      label: <p>{year}</p>,
      text: "year",
    }));
    setYearOptions(formattedYears);
  }, [students]);

  useEffect(() => {
    const uniqueSpecialties = [
      ...new Set(students.map((student) => student.categoryName)),
    ];
    const formattedSpecialties = uniqueSpecialties.map((specialty) => ({
      key: specialty,
      label: <p>{specialty}</p>,
      text: "specialty",
    }));
    setSpecialtyOptions(formattedSpecialties);
  }, [students]);

  const formatName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="mx-[60px] my-[70px] w-[100%]">
      <div className="flex justify-between items-center mb-[50px] w-[100%]">
        <p className="text-[#551d3b] text-[48px] font-[600] leading-[60px] text-left">
          Student Alumni
        </p>
        <Link
          to={"/alumni/create"}
          className="flex justify-center py-[10px] px-[20px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
        >
          Create New
        </Link>
      </div>
      <div className="flex flex-wrap gap-[30px]">
        {filteredStudents.map((student) => (
          <Link
            to={`/alumni/edit/${student.id}`}
            key={student.id}
            className="py-[24px] px-[32px] border-[1px] border-[#7F7E7E] rounded-[12px] flex flex-col items-center w-fit gap-[4px]"
          >
            <div className="flex gap-[5px] text-[20px] font-[600] leading-[25px] text-[#1A0E15]">
              <h3>{formatName(student.fullName)}</h3>
            </div>
            <p className="text-[14px] font-[400] leading-[17px] text-[#575457]">
              {student.categoryName}
            </p>
            <p className="text-[14px] font-[400] leading-[17px] text-[#575457]">
              <span>{student.enterTime}</span>-<span>{student.finishTime}</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Alumni;
