import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/event/${id}`
        );
        const eventData = response.data;
        setProgram(eventData);
        ["title", "description", "link", "createdDateEvent"].forEach((field) =>
          setValue(field, eventData[field])
        );
        setImagePreview(eventData.file); // Set the initial image preview
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [id, setValue]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
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
      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      await axios.put(`http://test-api.com/api/v1/event/${id}`, formData);
      alert("Successfully Updated");
      navigate("/event");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://test-api.com/api/v1/event/${id}`);
      alert("Event Deleted Successfully");
      navigate("/event");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit Event
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[50px] w-[100%]"
      >
        <div className="flex flex-col gap-[10px]">
          {/* Image preview */}
          {imagePreview && <img src={imagePreview} alt="Event" />}
          <label className="cursor-pointer inline w-fit font-[700]" htmlFor="img">
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
          <label htmlFor="title" className="font-[700]">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className=" border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description" className="font-[700]">Description</label>
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
          <label htmlFor="link" className="font-[700]">Link</label>
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
          <label htmlFor="createdDateEvent" className="font-[700]">Created Date</label>
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

export default EventEdit;
