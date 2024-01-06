import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="fixed top-0 left-0 p-[25px] bg-[#551D3B] w-[250px] h-[100vh] rounded-r-[10px]">
      <div>
        <ul className="flex flex-col gap-[10px] text-[white] font-[500] text-[16px]">
          <Link
            to={"/about/edit"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            About
          </Link>
          <Link
            to={"/adminstrative-staff"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Adminstrative Staff
          </Link>
          <Link
            to={"/academic-staff"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Academic Staff
          </Link>
          <Link
            to={"/publication"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Publication
          </Link>
          <Link
            to={"/alumni"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Alumni
          </Link>
          <Link
            to={"/student-club"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Student Club
          </Link>
          <Link
            to={"/event"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Event
          </Link>
          <Link
            to={"/news"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            News
          </Link>
          <Link
            to={"/academic-programs"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Academic Programs
          </Link>
          <Link
            to={"/course"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Course
          </Link>
          <Link
            to={"/contact"}
            className="p-[7px] hover:bg-[#2a0d1c] rounded-[8px]"
          >
            Contact
          </Link>
        </ul>
      </div>
    </section>
  );
};
export default Sidebar;
