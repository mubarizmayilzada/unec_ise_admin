import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/news/${id}`
        );
        setProgram(response.data);
        setSelectedImage(response.data.file);
        setImagePreview(response.data.file); // Set initial image preview
        setValue(response.data.description);
        ["title", "link", "createdDateEvent"].forEach((field) =>
          setFormValue(field, response.data[field])
        );
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, [id, setFormValue]);

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
      formData.append("newsCategoryId", 1); // Assuming a fixed category ID

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      await axios.put(`http://test-api.com/api/v1/news/${id}`, formData);

      alert("Successfully Updated");
      navigate("/news");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://test-api.com/api/v1/news/${id}`);
      alert("News deleted successfully");
      navigate("/news"); // Redirect after deletion
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit News
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[50px] w-[100%]"
      >
        <div className="flex flex-col gap-[10px]">
          {/* Conditional rendering for the image */}
          {imagePreview && <img src={imagePreview} alt="Selected" />}
          {!imagePreview && <img src={program.file} alt="Current" />}
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
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description">Description</label>
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
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex gap-[25px] flex-col mt-[50px]">
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

export default NewsEdit;
