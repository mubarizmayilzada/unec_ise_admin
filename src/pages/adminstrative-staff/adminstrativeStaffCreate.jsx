import { DevTool } from "@hookform/devtools";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const AdminstrativeStaffCreate = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null); // Track selected image
  const [adminstrativeStaff, setAdminstrativeStaff] = useState([]);

  const handleGetImage = (e) => {
    setImage(e.target.files[0]);
  };

  const form = useForm({});
  const navigate = useNavigate();
  const { register, control, handleSubmit } = form;

  React.useEffect(() => {
    const getAdminstrativeStaff = async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/administrativeStaffCategory`
      );
      const adminstrativeStaff = response.data.result;
      setAdminstrativeStaff(adminstrativeStaff);
    };

    getAdminstrativeStaff();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.name);
      formData.append("position", data.position);
      formData.append("email", data.email);
      formData.append("description", data.description);
      formData.append("phone", data.phone);
      formData.append("linkedinLink", data.linkedinLink);
      formData.append("cvLink", data.cvLink);
      formData.append("administrativeStaffCategoryId", data.id);
      if (image) {
        formData.append("file", image);
      }
      const response = await axios.post(
        `http://test-api.com/api/v1/administrative`,
        formData
      );
      alert("Successfully created:");
      navigate("/adminstrative-staff");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <section className=" flex flex-col mx-[60px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle form submission
        encType="multipart/form-data" // Ensure correct form data submission
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          <img src={image ? URL.createObjectURL(image) : ""} alt="" />
          <label className="cursor-pointer inline w-fit" htmlFor="img">
            Image
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="file"
            name="image"
            id="img"
            onChange={handleGetImage}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="name">
            Full Name
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="name"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="position">
            Position
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="position"
            id="position"
            {...register("position")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="email">
            Email
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="email"
            name="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="description">
            Description
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="description"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="phone">
            Phone
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="tel"
            name="phone"
            id="phone"
            {...register("phone")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="linkedinLink">
            Linkedin Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="url"
            name="linkedinLink"
            id="linkedinLink"
            {...register("linkedinLink")}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="cvLink">
            CV Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="url"
            name="cvLink"
            id="cvLink"
            {...register("cvLink")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="id">
            id
          </label>
          <select
            name="id"
            id=""
            placeholder=""
            defaultValue={""}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            {...register("id")}
          >
            <option value="" disabled hidden>
              Seçin
            </option>
            {adminstrativeStaff?.map((adminstrativeStaff) => (
              <option value={adminstrativeStaff.key}>
                {adminstrativeStaff.value}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="border-[1px] border-[teal] text-[white] bg-[teal] hover:bg-[#387272] py-[10px] px-[7px] rounded-[5px]"
          type="submit" // Trigger form submission
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default AdminstrativeStaffCreate;

// const AdminstrativeStaffCreate = () => {
//   const { id } = useParams();

//   const [program, setProgram] = useState({});
//   const [image, setImage] = useState([]);

//   const handleGetImage = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const form = useForm({});

//   const { register, control } = form;

//   return (
//     <section className=" flex flex-col mx-[60px] my-[25px] items-left w-[100%]">
//       <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
//         Edit
//       </h1>
//       <form
//         // onSubmit={handleSubmit(onSubmit)}
//         action="PUT"
//         className="flex flex-col gap-[25px] w-[350px]"
//       >
//         <div className="flex flex-col gap-[10px]">
//           <img src={program.file} alt="" />
//           <label className="cursor-pointer inline w-fit" htmlFor="img">
//             Image
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="file"
//             name="image"
//             id="img"
//             onClick={handleGetImage}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="name"
//             id="name"
//             {...register("name")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="position">
//             Position
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="position"
//             id="position"
//             {...register("position")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="email"
//             name="email"
//             id="email"
//             {...register("email")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="description">
//             Description
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="text"
//             name="description"
//             id="description"
//             {...register("description")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="phone">
//             Phone
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="tel"
//             name="phone"
//             id="phone"
//             {...register("phone")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="linkedin">
//             Linkedin Link
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="url"
//             name="linkedin"
//             id="linkedin"
//             {...register("linkedin")}
//           />
//         </div>

//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="cv">
//             CV Link
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             type="url"
//             name="cv"
//             id="cv"
//             {...register("cv")}
//           />
//         </div>
//         <div className="flex flex-col gap-[10px]">
//           <label className="cursor-pointer inline w-fit" htmlFor="id">
//             id
//           </label>
//           <select
//             name="id"
//             id=""
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
//             {...register("id")}
//           >
//             <option className="cursor-pointer" value="1">
//               salam
//             </option>
//             <option className="cursor-pointer" value="2">
//               salam2
//             </option>
//           </select>
//         </div>
//         <button
//           className="border-[1px] border-[teal] text-[white] bg-[teal] hover:bg-[#387272] py-[10px] px-[7px] rounded-[5px]"
//           type="button"
//         >
//           Submit
//         </button>
//       </form>
//       <DevTool control={control} />
//     </section>
//   );
// };

// export default AdminstrativeStaffCreate;
