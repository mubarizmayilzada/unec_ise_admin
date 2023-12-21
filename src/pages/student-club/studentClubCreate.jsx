import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StudentClubCreate = () => {
  const [image, setImage] = useState(null); // Track selected image
  const [imageError, setImageError] = useState(null); // Track image selection error
  const [description, setDescription] = useState(""); // Track description input

  const handleGetImage = (e) => {
    const fileList = e.target.files;
    const selectedImage = fileList[0]; // Select only the first image
    setImage(selectedImage);
    if (fileList.length > 1) {
      setImageError("You can only select one image.");
    } else {
      setImageError(null);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const form = useForm({});
  const { register, control, handleSubmit } = form;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", description);

      if (image) {
        formData.append("file", image);
      }

      const response = await axios.post(
        `http://test-api.com/api/v1/studentClub`, // Your POST endpoint for creating a new student club
        formData
      );

      alert("Successfully created:");
      navigate("/student-club");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <section className="flex flex-col mx-[60px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected Image"
              className="max-h-40 max-w-40"
            />
          )}
          <label className="cursor-pointer inline w-fit" htmlFor="img">
            Image (Only 1)
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="file"
            name="image"
            id="img"
            onChange={handleGetImage}
          />
          {imageError && <p className="text-red-500">{imageError}</p>}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="title">
            Title
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="title"
            id="title"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col gap-[10px] mb-[50px]">
          <label className="cursor-pointer inline w-fit" htmlFor="description">
            Description
          </label>
          <ReactQuill
            className="w-[900px] h-[auto]"
            theme="snow"
            value={description}
            onChange={handleDescriptionChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="border-[1px] border-[teal] text-[white] bg-[teal] hover:bg-[#387272] py-[10px] px-[7px] rounded-[5px]"
          type="submit"
          disabled={!image || imageError} // Disable if no image selected or image error
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default StudentClubCreate;
