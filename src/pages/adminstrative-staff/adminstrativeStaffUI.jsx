import React, { useEffect, useState } from "react";
import Linkedin from "../../assets/img/linkedinlogo.svg";
import Staff from "../../assets/img/staff.png";
import Cv from "../../assets/img/cv.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminstrativStaffUI = () => {
  const [department1Data, setDepartment1Data] = useState([]);
  const [department2Data, setDepartment2Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://test-api.com/api/v1/administrative"
        );
        console.log(
          response.data.administrativeStaff.items[1]
            .administrativeStaffCategoryName
        );
        // Assuming 'administrativeStaffCategoryName' denotes department
        const administrativeStaff = response.data.administrativeStaff.items;

        if (Array.isArray(administrativeStaff)) {
          const department1 = administrativeStaff.filter(
            (item) => item.administrativeStaffCategoryName === "category-1"
          );
          setDepartment1Data(department1);
        } else {
          console.error("administrativeStaff.items is not an array");
        }

        if (Array.isArray(administrativeStaff)) {
          const department2 = administrativeStaff.filter(
            (item) => item.administrativeStaffCategoryName === "category-2"
          );
          setDepartment2Data(department2);
        } else {
          console.error("administrativeStaff.items is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Render department 1 data
  const renderDepartment1 = () => {
    return department1Data.map((item) => (
      <Link to={`/adminstrative-staff/edit/${item.id}`}>
        <div
          key={item.id}
          className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E] flex flex-col justify-between"
        >
          <div className="text-center">
            <img
              className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
              src={item.file} // Replace with your image source field from API
              alt=""
            />
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                {item.fullName}
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                {item.position}
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">{item.email}</p>
              <span>{item.description}</span>
              <p>{item.phone}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to={item.linkedinLink}
              className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between items-center
               text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
            >
              <img src={Linkedin} alt="" className="mr-[8px]" />
              Linkedin Profile
            </Link>
            <Link
              to={item.cvLink}
              className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between"
            >
              <img src={Cv} alt="" className="mr-[8px]" />
              <span>CV</span>
            </Link>
          </div>
        </div>
      </Link>
    ));
  };

  // Render department 2 data
  const renderDepartment2 = () => {
    return department2Data.map((item) => (
      <Link to={`/adminstrative-staff/edit/${item.id}`}>
        <div
          key={item.id}
          className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E] flex flex-col justify-between"
        >
          <div className="text-center">
            <img
              className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
              src={item.file} // Replace with your image source field from API
              alt=""
            />
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                {item.fullName}
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                {item.position}
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">{item.email}</p>
              <span>{item.description}</span>
              <p>{item.phone}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              to={item.linkedinLink}
              className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between items-center
               text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
            >
              <img src={Linkedin} alt="" className="mr-[8px]" />
              Linkedin Profile
            </Link>
            <Link
              to={item.cvLink}
              className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between"
            >
              <img src={Cv} alt="" className="mr-[8px]" />
              <span>CV</span>
            </Link>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <section className="mx-[auto]">
      <h2 className="text-[48px] text-center font-lato font-[600] leading-[60px] mb-[30px] text-[#551D3B]">
        Adminstrativ Staff
      </h2>

      <Link
        to={"/adminstrative-staff/create"}
        className="flex justify-center mx-[auto] mb-[100px] py-[10px] px-[20px] w-[300px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>

      <h3 className="mb-[24px] text-[32px] text-center font-lato font-[600] leading-[40px] text-[#1A0E15]">
        Department 1
      </h3>
      <section className="flex mx-[60px] mb-[56px] justify-center gap-[33px]">
        {/* <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div> */}
        {renderDepartment1()}
      </section>

      <h3 className="mb-[24px] text-[32px] text-center font-lato font-[600] leading-[40px] text-[#1A0E15]">
        Department 2
      </h3>
      <section className="flex mx-[60px] mb-[150px] justify-center gap-[33px] flex-wrap">
        {/* <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]">
          <img
            className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
            src={Staff}
            alt=""
          />
          <div className="text-center">
            <div>
              <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
                Dr. Khatai Aliyev
              </h3>
              <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
                Director of the UNEC Empirical Research Center
              </p>
            </div>
            <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
              <p className="underline underline-offset-2">
                subini@stanford.edu
              </p>
              <span>CERAS 516</span>
              <p>012 513 13 13</p>
            </div>
            <div className="flex justify-between">
              <a
                href="https://salam"
                className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
              >
                <img src={Linkedin} alt="" className="mr-[8px]" />
                Linkedin Profile
              </a>
              <div className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between">
                <img src={Cv} alt="" className="mr-[8px]" />
                <span>CV</span>
              </div>
            </div>
          </div>
        </div> */}
        {renderDepartment2()}
      </section>
    </section>
  );
};

export default AdminstrativStaffUI;
