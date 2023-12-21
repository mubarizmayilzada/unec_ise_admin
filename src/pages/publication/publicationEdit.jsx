import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Link,
  useParams,
  useHistory,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Publication from "./publication";

const PublicationEdit = () => {
  const [program, setProgram] = useState({});
  const { id } = useParams();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const isoDate = new Date(data.creationDate).toISOString();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("readLink", data.readLink);
      formData.append("createdDateResearch", data.createdDateResearch);
      formData.append("researchCategoryId", 1);

      const response = await axios.put(
        `http://test-api.com/api/v1/research/${id}`,
        formData
      );

      alert("Successfully Updated");
      navigate("/publication");
      // Handle success - You may navigate to a different route or perform other actions upon successful update
    } catch (error) {
      console.error("Error:", error);
      // Handle error state
    }
  };

  const form = useForm({
    defaultValues: async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/research/${id}`
      );
      const programData = response.data;
      setProgram(programData);
      console.log(programData);
      return {
        title: programData?.title,
        description: programData?.description,
        readLink: programData?.readLink,
        creationDate: programData?.creationDate,
      };
    },
  });

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://test-api.com/api/v1/research/${id}`
      );
      console.log("Deletion Successful:", response.data);
      navigate("/publication");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const { register, control, handleSubmit } = form;

  return (
    <section className=" flex flex-col mx-[100px] my-[25px] items-left w-[500px]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="PUT"
        className="flex flex-col gap-[50px] w-[100%]"
      >
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="title"
          >
            Title
          </label>
          <textarea
            className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="title"
            id="title"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="resize-none h-[150px] border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="description"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="readLink"
          >
            Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="url"
            name="readLink"
            id="readLink"
            {...register("readLink")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          {/* <label
            className="cursor-pointer inline w-fit text-[20px] font-[500]"
            htmlFor="creationDate"
          >
            Created Date
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="creationDate"
            id="creationDate"
            {...register("creationDate")}
          /> */}

          <label htmlFor="createdDateResearch">Created Date</label>
          <input
            {...register("createdDateResearch")}
            type="datetime-local" // Use the appropriate input type for date-time
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
          />
        </div>

        <button
          onSubmit={handleSubmit(onSubmit)}
          className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
          type="submit"
        >
          Edit
        </button>
        <button
          className="border-[1px] border-[#551D3B] text-[white] bg-[red] hover:bg-[#b13232] py-[10px] px-[7px] rounded-[5px]"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default PublicationEdit;
