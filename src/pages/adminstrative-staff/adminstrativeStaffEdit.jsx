import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { get, set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const AdminstrativeStaffEdit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  // const [image, setImage] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null); // Track the selected image
  const [imagePreview, setImagePreview] = useState(null); // For displaying the preview of the selected image
  const [adminstrativeStaff, setAdminstrativeStaff] = useState([]); // [
  const [location, setLocation] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  console.log(adminstrativeStaff);

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
      formData.append("description", data.description);
      formData.append("phone", data.phone);
      formData.append("linkedinLink", data.linkedinLink);
      formData.append("cvLink", data.cvLink);
      // formData.append("file", image);
      // if (selectedImage) {
      //   formData.append("file", selectedImage);
      // }
      if (image) {
        formData.append("file", image);
      }
      formData.append("administrativeStaffCategoryId", data.id);
      const response = await axios.put(
        `http://test-api.com/api/v1/administrative/${id}`,
        formData
      );

      const values = getValues();
      setCategoryKey(values);
      navigate("/adminstrative-staff");
      alert("Successfully Updated");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const form = useForm({
    defaultValues: async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/administrative/${id}`
      );
      const programData = response.data;
      setProgram(programData);
      console.log(programData);
      setImagePreview(programData.file);
      return {
        name: programData?.fullName,
        image: programData?.file,
        position: programData?.position,
        email: programData?.email,
        description: programData?.description,
        phone: programData?.phone,
        linkedinLink: programData?.linkedinLink,
        cvLink: programData?.cvLink,
      };
    },
  });

  // const handleGetImage = (e) => {
  //   setImage(e.target.files[0]);
  // };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://test-api.com/api/v1/administrative/${id}`
      );
      alert("Deletion Successful:", response.data);
      navigate("/adminstrative-staff");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const { register, control, handleSubmit, getValues } = form;

  React.useEffect(() => {
    const getAdminstrativeStaff = async () => {
      const response = await axios.get(
        `http://test-api.com/api/v1/administrativeStaffCategory`
      );
      const adminstrativeStaff = response.data.result;
      setAdminstrativeStaff(adminstrativeStaff);
    };

    getAdminstrativeStaff();
  }, []);

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
          {/* <img src={program.file} alt="" /> */}
          {/* {imagePreview && <img src={imagePreview} alt="Event" />}
           */}
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
            // onClick={handleGetImage}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="name">
            Full Name
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
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
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
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
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="email"
            name="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="description">
            Description
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="text"
            name="description"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="phone">
            Phone
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="tel"
            name="phone"
            id="phone"
            {...register("phone")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="linkedinLink">
            Linkedin Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="url"
            name="linkedinLink"
            id="linkedinLink"
            {...register("linkedinLink")}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="cvLink">
            CV Link
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            type="url"
            name="cvLink"
            id="cvLink"
            {...register("cvLink")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="id">
            Category
          </label>
          <select
            name="id"
            id=""
            placeholder=""
            defaultValue={""}
            className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            {...register("id")}
          >
            <option value="" disabled hidden>
              Seçin
            </option>
            {adminstrativeStaff?.map((adminstrativeStaff) => (
              <option value={adminstrativeStaff.key}>
                {adminstrativeStaff.value}
              </option>
            ))}
          </select>
        </div>
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

export default AdminstrativeStaffEdit;
