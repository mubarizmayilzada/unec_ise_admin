import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutEdit = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");

  const [program, setProgram] = useState({});
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      console.log(images);

      formData.append("title", value);
      formData.append("description", data.description);
      formData.append("missionVision", data.missionVision);
      formData.append("values", data.values);
      formData.append("Files", images);

      images.forEach((image) => {
        formData.append("Files", image);
      });
      const response = await axios.put(
        `http://test-api.com/api/v1/about/2`,
        formData
      );

      alert("Successfully Updated");
      window.location.reload(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const form = useForm({
    defaultValues: async () => {
      const response = await axios.get(`http://test-api.com/api/v1/about`);
      const programData = response.data;
      setValue(programData?.title || "");

      setProgram(programData);
      return {
        title: programData?.title,
        description: programData?.description,
        missionVision: programData?.missionVision,
        values: programData?.values,
        images: programData?.file,
        id: programData?.id,
      };
    },
  });

  const { register, control, handleSubmit } = form;

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    setImages((prevImages) => [...prevImages, ...filesArray]);
  };

  return (
    <section className=" flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="PUT"
        className="flex flex-col gap-[50px] w-[100%]"
      >
        {/* <div className="flex flex-col gap-[10px]">
          <img src={program.file} alt="" />
          <label className="cursor-pointer inline w-fit" htmlFor="img">
            Image
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="file"
            name="image"
            id="img"
            onClick={(e) => {
              handleGetImage(e);
            }}
            {...register("image")}
          />
        </div> */}
        <div>
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="description"
          >
            Description
          </label>
          <ReactQuill
            className="w-[100%] h-[auto]"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        {/* <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="title"
          >
            Upper Description
          </label>
          <textarea
            className="resize-none h-[200px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="title"
            id="title"
            {...register("title")}
          />
        </div> */}
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="missionVision"
          >
            Mission & Vision
          </label>
          <textarea
            className="resize-none h-[200px] border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="email"
            name="missionVision"
            id="missionVision"
            {...register("missionVision")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="values"
          >
            Values
          </label>
          <textarea
            className="resize-none h-[200px] border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="values"
            id="values"
            {...register("values")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="images"
          >
            Images
          </label>
          <div className="flex gap-[20px] justify-between mb-[50px] flex-wrap">
            {program.file &&
              program.file.map((image, index) => (
                <img
                  src={image}
                  alt={index}
                  className="w-[100px] object-contain h-[100px]"
                />
              ))}
          </div>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button
          onSubmit={handleSubmit(onSubmit)}
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

export default AboutEdit;
