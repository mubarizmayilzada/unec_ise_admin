import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const AlumniEdit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  const [location, setLocation] = useState("");
  const [studentCategory, setStudentCategory] = useState([]); // [

  React.useEffect(() => {
    const getStudentCategory = async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/studentcategory`
      );
      const categoryID = response.data.result;
      setStudentCategory(categoryID);
    };

    getStudentCategory();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("enterTime", data.enterTime);
      formData.append("finishTime", data.finishTime);
      formData.append("studentCategoryId", data.id);

      const response = await axios.put(
        `http://test-api.com/api/v1/student/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Successfully Updated");
      navigate("/alumni");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const form = useForm({
    defaultValues: async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/student/${id}`
      );
      const programData = response.data;
      setProgram(programData);
      return {
        fullName: programData?.fullName,
        enterTime: programData?.enterTime,
        finishTime: programData?.finishTime,
      };
    },
  });

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://test-api.com/api/v1/student/${id}`
      );
      alert("Deletion Successful:", response.data);
      navigate("/alumni");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { register, control, handleSubmit } = form;

  return (
    <section className=" flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="PUT"
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="fullName">
            fullName
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="fullName"
            id="fullName"
            {...register("fullName")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="enterTime">Created Date</label>
          <input
            {...register("enterTime", { required: "Date is required" })}
            type="datetime-local"
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            id="enterTime"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="finishTime">Created Date</label>
          <input
            {...register("finishTime", { required: "Date is required" })}
            type="datetime-local" // Use the appropriate input type for date-time
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            id="finishTime"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="id">
            Category
          </label>
          <select
            name="id"
            id="id"
            placeholder=""
            defaultValue={""}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            {...register("id")}
          >
            <option value="" disabled hidden>
              Seçin
            </option>
            {studentCategory?.map((Student) => (
              <option value={Student.key}>{Student.value}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
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

export default AlumniEdit;
