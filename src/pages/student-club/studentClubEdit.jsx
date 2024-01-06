// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
// import { get, set, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import ReactQuill from "react-quill";

// const StudentClubEdit = () => {
//   const { id } = useParams();
//   const [program, setProgram] = useState({});
//   const [image, setImage] = useState([]);
//   const [adminstrativeStaff, setAdminstrativeStaff] = useState([]); // [
//   const [location, setLocation] = useState("");
//   const [categoryKey, setCategoryKey] = useState("");
//   const [images, setImages] = useState([]);
//   const [value, setValue] = useState("");

//   console.log(adminstrativeStaff);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("description", value);
//       console.log(data.description);
//       formData.append("files", images);

//       images.forEach((image) => {
//         formData.append("Files", image);
//       });

//       const response = await axios.put(
//         `http://test-api.com/api/v1/studentClub/${id}`,
//         formData
//       );

//       const values = getValues();
//       setCategoryKey(values);

//       console.log(categoryKey);
//       alert("Successfully Updated");
//       window.location.reload(false);
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error
//     }
//   };

//   const form = useForm({
//     defaultValues: async () => {
//       const response = await axios.get(
//         `http://test-api.com/api/v1/studentClub/${id}`
//       );
//       const programData = response.data;
//       setProgram(programData);
//       console.log(programData);
//       return {
//         title: programData?.title,
//         description: programData?.description,
//         file: programData?.files,
//       };
//     },
//   });

//   // const handleGetImage = (e) => {
//   //   setImage(e.target.files[0]);
//   // };

//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(
//         `http://test-api.com/api/v1/studentClub/${id}`
//       );
//       alert("Deletion Successful:", response.data);
//       navigate("/adminstrative-staff");
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error
//     }
//   };

//   const { register, control, handleSubmit, getValues } = form;

//   const handleFileChange = (e) => {
//     const fileList = e.target.files;
//     const filesArray = Array.from(fileList);
//     setImages((prevImages) => [...prevImages, ...filesArray]);
//   };

//   return (
//     <section className=" flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
//       <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
//         Edit
//       </h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         action="PUT"
//         className="flex flex-col gap-[25px] w-[350px]"
//       >
//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
//             type="text"
//             name="title"
//             id="title"
//             {...register("title")}
//           />
//         </div>

//         <div>
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <ReactQuill
//             className="w-[100%] h-[auto]"
//             theme="snow"
//             value={value}
//             onChange={setValue}
//             {...register("description")}
//           />
//         </div>

//         <div className="flex flex-col gap-[10px]">
//           <label
//             className="cursor-pointer inline w-fit text-[20px] font-[500]"
//             htmlFor="images"
//           >
//             Images
//           </label>
//           <div className="flex gap-[20px] justify-between mb-[50px] flex-wrap">
//             {program.file &&
//               program.file.map((image, index) => (
//                 <img
//                   src={image}
//                   alt={index}
//                   className="w-[100px] object-contain h-[100px]"
//                 />
//               ))}
//           </div>
//           <input
//             className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
//             type="file"
//             name="files"
//             id="files"
//             multiple
//             onChange={handleFileChange}
//           />
//         </div>

//         <button
//           onClick={handleSubmit(onSubmit)}
//           className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
//           type="submit"
//         >
//           Submit
//         </button>
//         <button
//           className="border-[1px] border-[#551D3B] text-[white] bg-[red] hover:bg-[#b13232] py-[10px] px-[7px] rounded-[5px]"
//           type="button"
//           onClick={handleDelete}
//         >
//           Delete
//         </button>
//       </form>
//       <DevTool control={control} />
//     </section>
//   );
// };

// export default StudentClubEdit;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StudentClubEdit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState(); // Track selected image
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/studentClub/${id}`
        );
        const programData = response.data;
        setProgram(programData);
        setValue(programData?.description || "");
        // Assuming there's a single image URL stored in programData.imageUrl
        setSelectedImage(response.data.file);
        setImagePreview(response.data.file);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create and set the image preview URL
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", value);

      // If user selected a new image, update the image

      if (selectedImage) {
        formData.append("file", selectedImage);
      }
      const response = await axios.put(
        `http://test-api.com/api/v1/studentClub/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Successfully Updated");
      navigate("/student-club");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://test-api.com/api/v1/studentClub/${id}`);
      alert("Event Deleted Successfully");
      navigate("/student-club");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          {/* Conditional rendering for the image */}
          {imagePreview && (
            <img src={imagePreview} alt="Selected" className="object-cover" />
          )}
          {!imagePreview && (
            <img src={program.file} alt="Current" className="object-cover" />
          )}
          <label className="cursor-pointer inline w-fit" htmlFor="img">
            Image
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="file"
            name="image"
            id="img"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="title"
            id="title"
            {...register("title")}
            defaultValue={program?.title || ""}
          />
        </div>

        <div>
          <label
            className="cursor-pointer  w-fit text-[20px] font-[500] mb-[20px] inline-block"
            htmlFor="description"
          >
            Description
          </label>
          <ReactQuill
            className="w-[800px] h-[auto]" // Adjust the height as needed
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
            ]}
          />
        </div>

        <div className="flex gap-[25px] flex-col">
          <button
            className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border-[1px] border-[#ff0000] text-[white] bg-[#ff0000] hover:bg-[#cc0000] py-[10px] px-[7px] rounded-[5px]"
            type="button"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudentClubEdit;
