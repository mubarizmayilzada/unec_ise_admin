import { DevTool } from "@hookform/devtools";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, useFieldArray } from "react-hook-form";

const AcademicProgramCreate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [exchangeProgram, setExchangeProgram] = useState("");
  const [doubleDiplome, setDoubleDiplome] = useState("");
  const [courses, setCourses] = useState("");
  const [courseCategories, setCourseCategories] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();

  const {
    fields: courseRelationsFields,
    append: appendCourseRelation,
    remove: removeCourseRelation,
  } = useFieldArray({
    control,
    name: "courseRelationsRequests",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesListPromise = axios.get(
          `http://test-api.com/api/v1/course`
        );
        const courseCategoryListPromise = axios.get(
          `http://test-api.com/api/v1/courseCategory`
        );
        const [coursesList, courseCategoryList] = await Promise.all([
          coursesListPromise,
          courseCategoryListPromise,
        ]);
        setCourses(coursesList.data.result);
        console.log(coursesList.data.result);
        setCourseCategories(courseCategoryList.data.result);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };
    fetchData();
  }, [id, setCourses, setCourseCategories]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);
      formData.append("doubleDiplome", doubleDiplome);
      formData.append("exchangeProgram", exchangeProgram);
      formData.append("file", image);
      Array.from(data.courseRelationsRequests).forEach(
        (courseRelation, index) => {
          formData.append(
            `AcademicSyllabusRequests[${index}].courseId`,
            courseRelation.courseId
          );
          formData.append(
            `AcademicSyllabusRequests[${index}].courseCategoryId`,
            courseRelation.courseCategoryId
          );
        }
      );

      const response = await axios.post(
        `http://test-api.com/api/v1/academicProgram/`,
        formData
      );

      alert("Successfully Updated");
      window.location.reload(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="PUT"
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          <img src={""} alt="" />
          <label className="cursor-pointer inline w-fit" htmlFor="img">
            Image
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="file"
            name="image"
            id="img"
            onClick={handleImageChange}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="description">
            Short Description
          </label>
          <ReactQuill
            className="w-[800px] h-[auto] mb-[50px]" // Adjust the height as needed
            theme="snow"
            value={description}
            onChange={setDescription}
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
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit"
            htmlFor="shortDescription"
          >
            Description
          </label>
          <ReactQuill
            className="w-[800px] h-[auto] mb-[50px]" // Adjust the height as needed
            theme="snow"
            value={shortDescription}
            onChange={setShortDescription}
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
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit"
            htmlFor="doubleDiplome"
          >
            Double Diploma
          </label>
          <ReactQuill
            className="w-[800px] h-[auto] mb-[50px]" // Adjust the height as needed
            theme="snow"
            value={doubleDiplome}
            onChange={setDoubleDiplome}
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
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit"
            htmlFor="exchangeProgram"
          >
            Exchange Program
          </label>
          <ReactQuill
            className="w-[800px] h-[auto] mb-[50px]" // Adjust the height as needed
            theme="snow"
            value={exchangeProgram}
            onChange={setExchangeProgram}
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
        </div>

        {Array.from(courseRelationsFields).map((courseRelation, index) => (
          <div className="flex flex-col gap-[10px]" key={index}>
            <label className="cursor-pointer inline w-fit">
              Criteria {index + 1}
            </label>
            <select
              key={index + 1}
              name="courseId"
              id="courseId"
              placeholder=""
              className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
              {...register(`courseRelationsRequests.${index}.courseId`)}
            >
              {Array.from(courses)?.map((Student, index) => (
                <option key={index} value={Student.key}>
                  {Student.value}
                </option>
              ))}
            </select>
            <select
              key={index + 2}
              name="courseCategoryId"
              id="courseCategoryId"
              placeholder=""
              className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
              {...register(`courseRelationsRequests.${index}.courseCategoryId`)}
            >
              {Array.from(courseCategories)?.map((Student, index) => (
                <option key={index} value={Student.key}>
                  {Student.value}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeCourseRelation(index)}
              className="hover:text-[red]"
            >
              Remove Criteria
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendCourseRelation({
              courseId: courses[0].key || 1,
              courseCategoryId: courseCategories[0].key || 1,
            })
          }
          className="border-[1px] border-[#ccc] hover:border-[#551D3B] py-[8px] px-[10px] rounded-[5px]"
        >
          Add Ap
        </button>

        <button
          onClick={handleSubmit(onSubmit)}
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

export default AcademicProgramCreate;
