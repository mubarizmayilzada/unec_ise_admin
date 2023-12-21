import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const NewsCreate = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For handling the selected image file
  const [imagePreview, setImagePreview] = useState(null); // For displaying the preview of the selected image
  const [description, setDescription] = useState(""); // For the text editor input
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", description);
      formData.append("newsCategoryId", 1); // Example category ID

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      await axios.post(`http://test-api.com/api/v1/news`, formData);

      alert("Successfully Created");
      navigate("/news");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create News
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[50px] w-[100%]">
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
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-[1000px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description">Description</label>
          <ReactQuill
            className="w-[800px] h-[auto]"
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
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
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

export default NewsCreate;
