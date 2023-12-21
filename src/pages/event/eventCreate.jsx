import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EventCreate = () => {
  const [image, setImage] = useState(null); // Track the selected image
  const [imagePreview, setImagePreview] = useState(null); // For displaying the preview of the selected image
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGetImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("link", data.link);
      formData.append("createdDateEvent", data.createdDateEvent);
      if (image) {
        formData.append("file", image);
      }
      await axios.post(
        `http://test-api.com/api/v1/event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Successfully posted");
      navigate("/event");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create New Event
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[50px] w-[100%]"
      >
        <div className="flex flex-col gap-[10px]">
          {/* Image preview */}
          {imagePreview && <img src={imagePreview} alt="Selected" />}
          {!imagePreview && <p>No image selected</p>}
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
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className=" border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description">Description</label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="link">Link</label>
          <input
            {...register("link", {
              required: "Link is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Enter a valid URL",
              },
            })}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.link && (
            <span className="text-red-500">{errors.link.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="createdDateEvent">Created Date</label>
          <input
            {...register("createdDateEvent", { required: "Date is required" })}
            type="datetime-local"
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            id="createdDateEvent"
          />
          {errors.createdDateEvent && (
            <span className="text-red-500">
              {errors.createdDateEvent.message}
            </span>
          )}
        </div>
        <button
          className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default EventCreate;
