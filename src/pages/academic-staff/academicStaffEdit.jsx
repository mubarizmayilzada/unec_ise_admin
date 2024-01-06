import { DevTool } from "@hookform/devtools";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const AcademicStaffEdit = () => {
  const [academicStaffCategories, setAcademicStaffCategories] = React.useState(
    []
  );

  const { id } = useParams();
  const [program, setProgram] = useState(null);
  // const [image, setImage] = useState([]);
  const [image, setImage] = useState(null); // Track the selected image
  const [imagePreview, setImagePreview] = useState(null); // For displaying the preview of the selected image
  const [adminstrativeStaff, setAdminstrativeStaff] = useState([]); // [
  const [location, setLocation] = useState("");
  const [categoryKey, setCategoryKey] = useState("");

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
      formData.append("fullName", data.name);
      formData.append("position", data.position);
      formData.append("email", data.email);
      formData.append("assistant", data.assistant);
      formData.append("office", data.office);
      formData.append("linkedinLink", data.linkedinLink);
      formData.append("GoogLeScholarLink", data.GoogLeScholarLink);
      formData.append("cvLink", data.cvLink);
      // formData.append("file", image);
      if (image) {
        formData.append("file", image);
      }

      data.editorValues.map((item, index) => {
        formData.append(`SaveAcademicDetailRequests[${index}].name`, item.name);
        formData.append(
          `SaveAcademicDetailRequests[${index}].academicStaffCategoryId`,
          item.academicStaffCategoryId
        );
      });
      const response = await axios.put(
        `http://test-api.com/api/v1/Academic/${id}`,
        formData
      );

      const values = getValues();
      setCategoryKey(values);

      console.log(categoryKey);
      alert("Successfully Updated");
      window.location.reload(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const { form, control, setValue, register, handleSubmit, getValues, watch } =
    useForm(
      {
        defaultValues: async () => {
          const response = await axios.get(
            `http://test-api.com/api/v1/Academic/${id}`
          );

          const response2 = await axios.get(
            `http://test-api.com/api/v1/academicStaffCategory`
          );
          const academicStaffCategories = response2.data.result;
          setAcademicStaffCategories(academicStaffCategories);
          const programData = response.data;
          setProgram(programData.academicDetailCategoryDtos);
          setImagePreview(programData.file);
          return {
            academicCategories: response.data.academicDetailCategoryDtos.map(
              (category) => {
                return {
                  academicStaffCategoryId: category.id,
                  name: category.academicStaffCategoryName,
                  title: category.value,
                };
              }
            ),
            editorValues: Array.from(
              response.data.academicDetailCategoryDtos
            ).map((item) => {
              return {
                academicStaffCategoryId: item.id,
                name: item.value,
              };
            }),
            name: programData?.fullName,
            image: programData?.file,
            position: programData?.position,
            email: programData?.email,
            office: programData?.office,
            assistant: programData?.assistant,
            phone: programData?.phone,
            linkedinLink: programData?.linkedinLink,
            GoogLeScholarLink: programData?.googLeScholarLink,
            cvLink: programData?.cvLink,
          };
        },
      },
      []
    );

  const handleImageChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const { fields: categoryFields } = useFieldArray({
    control,
    name: "catiegories",
  });

  const { fields: editorValuesFields } = useFieldArray({
    control,
    name: "editorValues",
  });

  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files) {
  //     const file = e.target.files;
  //     setSelectedImage(file);
  //     setImagePreview(URL.createObjectURL(file)); // Create and set the image preview URL
  //   }
  // };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://test-api.com/api/v1/Academic/${id}`
      );
      alert("Deletion Successful:", response.data);
      navigate("/academic-staff");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  console.log(editorValuesFields);

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
          {/* Image preview */}
          {imagePreview && <img src={imagePreview} alt="Event" />}
          <label
            className="cursor-pointer inline w-fit font-[700]"
            htmlFor="img"
          >
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
          <label className="cursor-pointer inline w-fit" htmlFor="name">
            Full Name
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="name"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="position">
            Position
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="position"
            id="position"
            {...register("position")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="email">
            Email
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="email"
            name="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="assistant">
            Assistant
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="assistant"
            id="assistant"
            {...register("assistant")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="office">
            Office
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="office"
            id="office"
            {...register("office")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="linkedinLink">
            Linkedin Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="url"
            name="linkedinLink"
            id="linkedinLink"
            {...register("linkedinLink")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit"
            htmlFor="GoogLeScholarLink"
          >
            GoogLe Scholar Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="url"
            name="GoogLeScholarLink"
            id="GoogLeScholarLink"
            {...register("GoogLeScholarLink")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="cvLink">
            CV Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="url"
            name="cvLink"
            id="cvLink"
            {...register("cvLink")}
          />
        </div>

        {program && Array.isArray(program) ? (
          <div>
            {program.map((item, index) => {
              return (
                <div key={item.id}>
                  <label className="block my-[20px]">
                    {item.academicStaffCategoryName}
                  </label>
                  <textarea
                    className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
                    name={`editorValues.[${index}].name`}
                    {...register(`editorValues[${index}].name`)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
          type="submit"
        >
          Submit
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

export default AcademicStaffEdit;
