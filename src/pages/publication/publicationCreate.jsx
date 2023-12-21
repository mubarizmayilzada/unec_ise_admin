// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Link,
//   useParams,
//   useHistory,
//   useNavigate,
//   Navigate,
// } from "react-router-dom";
// import { set, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import Publication from "./publication";

// const PublicationCreate = () => {
//   const [program, setProgram] = useState({});
//   const { id } = useParams();
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", data.description);
//       formData.append("readLink", data.readLink);
//       formData.append("creationDate", data.creationDate);
//       formData.append("researchCategoryId", 1);
//       const response = await axios.post(
//         `http://test-api.com/api/v1/research`,
//         formData
//       );
//       alert("Successfully posted");
//       window.location.reload(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const form = useForm({});

//   const { register, control, handleSubmit } = form;

//   return (
//     <section className=" flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
//       <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
//         Edit
//       </h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         action="POST"
//         className="flex flex-col gap-[50px] w-[100%]"
//       >
//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <textarea
//             className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="title"
//             id="title"
//             {...register("title")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="description"
//             id="description"
//             {...register("description")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="readLink"
//           >
//             Link
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="url"
//             name="readLink"
//             id="readLink"
//             {...register("readLink")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="creationDate"
//           >
//             Created Date
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="creationDate"
//             id="creationDate"
//             {...register("creationDate")}
//           />
//         </div>

//         <button
//           onSubmit={handleSubmit(onSubmit)}
//           className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
//           type="submit"
//         >
//           Edit
//         </button>
//       </form>
//       <DevTool control={control} />
//     </section>
//   );
// };

// export default PublicationCreate;

import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const PublicationCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("readLink", data.readLink);
      formData.append("createdDateResearch", data.creationDate);
      formData.append("researchCategoryId", 1); // Replace with your category ID

      const response = await axios.post(
        `http://test-api.com/api/v1/research`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Successfully posted");
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error state
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create New
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[50px] w-[100%]"
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title">Title</label>
          <textarea
            {...register("title", { required: "Title is required" })}
            className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="readLink">Link</label>
          <input
            {...register("readLink", {
              required: "Link is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Enter a valid URL",
              },
            })}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.readLink && (
            <span className="text-red-500">{errors.readLink.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="creationDate">Created Date</label>
          <input
            {...register("creationDate")}
            type="datetime-local" // Use the appropriate input type for date-time
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
        </div>

        <button
          className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
          type="submit"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default PublicationCreate;
