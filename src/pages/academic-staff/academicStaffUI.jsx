import React, { useEffect, useState } from "react";
import Linkedin from "../../assets/img/linkedinlogo.svg";
import Staff from "../../assets/img/staff.png";
import Cv from "../../assets/img/cv.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const AcademicStaffUI = () => {
  const [academicData, setAcademicData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://test-api.com/api/v1/administrative"
  //         );
  //         console.log(
  //           response.data.administrativeStaff.items[1]
  //             .administrativeStaffCategoryName
  //         );
  //         // Assuming 'administrativeStaffCategoryName' denotes department
  //         const administrativeStaff = response.data.administrativeStaff.items;

  //         if (Array.isArray(administrativeStaff)) {
  //           const department1 = administrativeStaff.filter(
  //             (item) => item.administrativeStaffCategoryName === "category-1"
  //           );
  //           setDepartment1Data(department1);
  //         } else {
  //           console.error("administrativeStaff.items is not an array");
  //         }

  //         if (Array.isArray(administrativeStaff)) {
  //           const department2 = administrativeStaff.filter(
  //             (item) => item.administrativeStaffCategoryName === "category-2"
  //           );
  //           setDepartment2Data(department2);
  //         } else {
  //           console.error("administrativeStaff.items is not an array");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // Render department 1 data
  //   const renderDepartment1 = () => {
  //     return department1Data.map((item) => (
  //       <Link to={`/adminstrative-staff/edit/${item.id}`}>
  //         <div
  //           key={item.id}
  //           className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E] flex flex-col justify-between"
  //         >
  //           <div className="text-center">
  //             <img
  //               className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
  //               src={item.file} // Replace with your image source field from API
  //               alt=""
  //             />
  //             <div>
  //               <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
  //                 {item.fullName}
  //               </h3>
  //               <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
  //                 {item.position}
  //               </p>
  //             </div>
  //             <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
  //               <p className="underline underline-offset-2">{item.email}</p>
  //               <span>{item.description}</span>
  //               <p>{item.phone}</p>
  //             </div>
  //           </div>
  //           <div className="flex justify-between">
  //             <Link
  //               to={item.linkedinLink}
  //               className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between items-center
  //                text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
  //             >
  //               <img src={Linkedin} alt="" className="mr-[8px]" />
  //               Linkedin Profile
  //             </Link>
  //             <Link
  //               to={item.cvLink}
  //               className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between"
  //             >
  //               <img src={Cv} alt="" className="mr-[8px]" />
  //               <span>CV</span>
  //             </Link>
  //           </div>
  //         </div>
  //       </Link>
  //     ));
  //   };

  // Render department 2 data
  //   const renderDepartment2 = () => {
  //     return department2Data.map((item) => (
  //       <Link to={`/adminstrative-staff/edit/${item.id}`}>
  //         <div
  //           key={item.id}
  //           className="py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E] flex flex-col justify-between"
  //         >
  //           <div className="text-center">
  //             <img
  //               className="mx-[auto] w-[200px] h-[200px] mb-[12px]"
  //               src={item.file} // Replace with your image source field from API
  //               alt=""
  //             />
  //             <div>
  //               <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]">
  //                 {item.fullName}
  //               </h3>
  //               <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]">
  //                 {item.position}
  //               </p>
  //             </div>
  //             <div className="mb-[24px] text-[#1A0E15] text-[16px] font-lato font-[500] leading-[24px] mt-[24px]">
  //               <p className="underline underline-offset-2">{item.email}</p>
  //               <span>{item.description}</span>
  //               <p>{item.phone}</p>
  //             </div>
  //           </div>
  //           <div className="flex justify-between">
  //             <Link
  //               to={item.linkedinLink}
  //               className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-between items-center
  //                text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]"
  //             >
  //               <img src={Linkedin} alt="" className="mr-[8px]" />
  //               Linkedin Profile
  //             </Link>
  //             <Link
  //               to={item.cvLink}
  //               className="whitespace-nowrap	 px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[16px] font-lato font-[500] leading-[20px] rounded-[8px] flex justify-between"
  //             >
  //               <img src={Cv} alt="" className="mr-[8px]" />
  //               <span>CV</span>
  //             </Link>
  //           </div>
  //         </div>
  //       </Link>
  //     ));
  //   };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://test-api.com/api/v1/Academic");
        setAcademicData(response.data.academic.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-[auto]">
      <h2 className="text-[48px] text-center font-lato font-[600] leading-[60px] mb-[25px] text-[#551D3B]">
        Academic Staff
      </h2>
      <Link
        to={"/academic-staff/create"}
        className="flex justify-center mx-[auto] mb-[100px] py-[10px] px-[20px] w-[300px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>
      <section className="flex mx-[60px] mb-[35px] justify-center gap-[33px] flex-wrap">
        {academicData.map((staff, index) => (
          <Link to={`/academic-staff/edit/${staff.id}`}>
            <div
              key={index}
              className="flex flex-col justify-between py-[24px] px-[32px] rounded-[12px] w-[308px] border-[1px] border-[#7F7E7E]"
            >
              <div className="text-center">
                <img
                  className="mx-[auto] w-[200px] h-[200px] mb-[12px] rounded-[5px]"
                  src={staff.file}
                  alt=""
                />
                <div>
                  <h3 className="text-[#1A0E15] text-[20px] font-lato font-[600] leading-[25px] mb-[5px]  hover:text-[#551D3B]">
                    {staff.fullName}
                  </h3>
                  <p className="text-[#575457] text-[14px] font-lato font-[400] leading-[17px]  hover:text-[#551D3B]">
                    {staff.position}
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-col justify-between gap-[12px] mt-[24px]">
                <div className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#0A66C2] flex justify-center gap-[10px] text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]">
                  <img src={Linkedin} alt="" />
                  Linkedin Profile
                </div>
                <div className="whitespace-nowrap rounded-[8px] px-[16px] py-[12px] bg-[#7F7E7E] flex justify-center gap-[10px] text-[14px] font-lato font-[500] leading-[17px] text-[#F8F8F9]">
                  Google Scholarship
                </div>
                <div className="whitespace-nowrap px-[16px] py-[12px] border-[1px] border-[#7F7E7E] text-[#7F7E7E] text-[14px] font-lato font-[500] leading-[17px] rounded-[8px] flex justify-center gap-[10px]">
                  <img src={Cv} alt="" />
                  <span>CV</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default AcademicStaffUI;
