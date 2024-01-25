import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutEdit = () => {
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [value, setValue] = useState("");

  const [program, setProgram] = useState({});
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", value);
      formData.append("description", data.description);
      formData.append("missionVision", data.missionVision);
      formData.append("values", data.values);
      formData.append("Files", images);

      // if (images.length > 0) {
      //   console.log("here");

      //   images.forEach((image) => {
      //     formData.append("Files", image);
      //   });
      // } else {
      //   console.log("else");
      //   const filesPromises = program.file.map(async (f) => {
      //     const test = await fetch(f);
      //     const blob = await test.blob();

      //     const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      //     return file;
      //   });

      //   const files = await Promise.all(filesPromises);

      //   console.log({ files });

      //   files.forEach((file) => {
      //     formData.append("Files", file);
      //   });
      // }

      //for new images
      images.forEach((image) => {
        formData.append("Files", image);
      });

      //for existing images
      const filesPromises = existingImages.map(async (f) => {
        const test = await fetch(f);
        const blob = await test.blob();

        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        return file;
      });

      const files = await Promise.all(filesPromises);

      files.forEach((file) => {
        formData.append("Files", file);
      });

      const response = await axios.put(
        `http://test-api.com/api/v1/about/2`,
        formData
      );

      setImages([]);

      // alert("Successfully Updated");

      // window.location.reload();
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
      console.log("hey");
      setExistingImages(programData?.file);
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

  console.log({ existingImages });

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
          <div className="flex gap-[5px] mb-[50px] flex-wrap">
            {/* {program.file &&
              program.file
                .concat(images.map((image) => URL.createObjectURL(image)))
                .map((image, index) => (
                  <div className="w-[300px]">
                    <img src={image} alt={index} className=" object-contain" />
                  </div>
                ))} */}

            {existingImages &&
              existingImages.map((image, index) => (
                <div
                  onClick={() => {
                    setExistingImages((prev) =>
                      prev.filter((p) => p !== image)
                    );
                  }}
                  className="w-[300px]"
                >
                  <img src={image} alt={index} className=" object-contain" />
                </div>
              ))}

            {images &&
              images.map((image, index) => (
                <div
                  onClick={() => {
                    setImages((prev) => prev.filter((p) => p !== image));
                  }}
                  className="w-[240px]"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={index}
                    className=" object-contain"
                  />
                </div>
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
