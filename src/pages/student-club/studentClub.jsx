import Club from "../../assets/img/studentclubimg.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentClub = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://test-api.com/api/v1/studentClub"
        );
        setClubs(response.data.studentClub.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log();

  return (
    <section className="mx-[60px] mb-[150px]">
      <h2 className="text-[48px] text-center font-lato font-[600] leading-[60px] mb-[25px] text-[#551D3B]">
        Student Clubs
      </h2>
      <Link
        to={"/student-club/create"}
        className="flex justify-center mx-[auto] mb-[100px] py-[10px] px-[20px] w-[300px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>
      <div className="flex justify-center gap-[32px] flex-wrap">
        {clubs.map((club) => (
          <Link to={`/student-club/edit/${club.id}`}>
            <div
              key={club.id}
              className="w-[306px] h-[245px] rounded-[8px] relative"
            >
              <img
                className="rounded-[8px] w-[100%] h-[100%]"
                src={club.file}
                alt={club.title}
              />
              <p className="text-[24px] font-[700] leading-[30px] text-[#FFFDFE] py-[14px] px-[40px] bg-[#767173] absolute left-[0] bottom-0 w-[230px] rounded-tr-[8px] rounded-bl-[8px]">
                {club.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default StudentClub;
