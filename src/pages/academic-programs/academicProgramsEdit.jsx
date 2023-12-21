import { DevTool } from "@hookform/devtools";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
const AcademicProgramsEdit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  const [data, setData] = useState({ key: "test", value: "test" });
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [exchangeProgram, setExchangeProgram] = useState("");
  const [doubleDiplome, setDoubleDiplome] = useState("");
  const [courses, setCourses] = useState("");
  const [courseCategories, setCourseCategories] = useState("");
  const [courseRelationsKeyValue, setCourseRelationsKeyValue] = useState([]);
  const [courseRelations, setCourseRelations] = useState([]);
  const navigate = useNavigate();
  const [selectedCourseIds, setSelectedCourseIds] = useState({});
  const [apData, setapData] = useState([1]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePromise = axios.get(
          `http://test-api.com/api/v1/academicProgram/${id}`
        );
        const coursesListPromise = axios.get(
          `http://test-api.com/api/v1/course`
        );
        const courseCategoryListPromise = axios.get(
          `http://test-api.com/api/v1/courseCategory`
        );
        const courseRelationsPromise = axios.get(
          `http://test-api.com/api/v1/course/GetAllCourse/${id}`
        );

        const [
          response,
          coursesList,
          courseCategoryList,
          courseRelationsResponse,
        ] = await Promise.all([
          responsePromise,
          coursesListPromise,
          courseCategoryListPromise,
          courseRelationsPromise,
        ]);

        const programData = response.data;
        setProgram(programData);
        setName(programData?.name || "");
        setDescription(programData?.description || "");
        setShortDescription(programData?.shortDescription || "");
        setDoubleDiplome(programData?.doubleDiplome || "");
        setExchangeProgram(programData?.exchangeProgram || "");
        setCourses(coursesList.data.result);
        setCourseCategories(courseCategoryList.data.result);

        const mappedCourseRelations = courseRelationsResponse.data.map((x) => {
          return { ...x, guid: uuidv4() };
        });

        const mappedCourseRelationsKeyValue = Array.from(
          mappedCourseRelations
        ).map((x) => {
          return {
            id: x.guid,
            courseId: x.courseId,
            courseCategoryId: x.courseCategoryId,
          };
        });
        setCourseRelations(mappedCourseRelations);
        setCourseRelationsKeyValue(mappedCourseRelationsKeyValue);

        // Assuming "file" is the image field
        setImage(programData?.file || null);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };
    fetchData();
  }, [id, setCourses, setCourseCategories, setCourseRelations]);

  useEffect(() => {
    const initialCourseIds = {};
    Array.from(courseRelations).forEach((relation) => {
      initialCourseIds[relation.guid] = {
        courseName: relation.courceName,
        category: relation.courseCategoryName,
      }; // Set a default value if needed
    });
    setSelectedCourseIds(initialCourseIds);
  }, [courseRelations, setSelectedCourseIds]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("shortDescription", data.shortDescription);
      formData.append("doubleDiplome", data.doubleDiplome);
      formData.append("exchangeProgram", data.exchangeProgram);
      formData.append("file", image);

      const response = await axios.put(
        `http://test-api.com/api/v1/academicProgram/${id}`,
        formData
      );

      alert("Successfully Updated");
      window.location.reload(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://test-api.com/api/v1/academicProgram/${id}`
      );
      alert("Deletion Successful:", response.data);
      navigate("/adminstrative-staff");
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleapChange = () => {
    setapData([...apData, Array.from(apData).length]);
  };

  const removeApRequest = (index) => {
    const newContentRequests = apData.filter((_, idx) => idx !== index);
    setapData(newContentRequests);
  };

  const handleCourseRelationsCourseIdChange = (e, index) => {
    const selectValue = JSON.parse(e.target.value);
    const id = uuidv4();
    console.log(selectValue);
    if (!selectedCourseIds[selectValue.key]) {
      setSelectedCourseIds({
        ...selectedCourseIds,
        [id]: {
          courseName: selectValue.value,
          category: selectValue.value,
        },
      });
    }
    const updatedRelations = Array.from(courseRelationsKeyValue).map(
      (courseRelation) => {
        if (
          courseRelation.id === selectValue.id &&
          courseRelation.courseId !== selectValue.key
        ) {
          return {
            ...courseRelation,
            guid: id,
            courseId: selectValue.key,
          };
        }
        return courseRelation;
      }
    );
    setCourseRelations(updatedRelations);
    setCourseRelationsKeyValue(
      updatedRelations.map((x) => {
        return {
          id: id,
          courseId: x.courseId,
          courseCategoryId: x.courseCategoryId,
        };
      })
    );
  };

  const handleCourseRelationsCourseCategoryIdChange = (e, index) => {
    const updatedRelations = Array.from(courseRelationsKeyValue).map(
      (courseRelation) => {
        if (courseRelation.courseCategoryId === e.target.value.key) {
          return {
            ...courseRelation,
            courseCategoryId: e.target.value.key,
          };
        }
        return courseRelation;
      }
    );
    setCourseRelationsKeyValue(updatedRelations);
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="PUT"
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          <img src={program.file} alt="" />
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
            Description
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
            Short Description
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

        {Array.from(courseRelations).map((courseRelation, index) => (
          <div className="flex flex-col gap-[10px]" key={index}>
            <label className="cursor-pointer inline w-fit">
              Criteria {index + 1}
            </label>
            <select
              key={index + 1}
              name="id"
              id="id"
              placeholder=""
              onChange={(e) => handleCourseRelationsCourseIdChange(e)}
              value={selectedCourseIds[courseRelation.guid]}
              className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            >
              {Array.from(courses)?.map((Student) => (
                <option
                  value={JSON.stringify({
                    id: courseRelation.guid,
                    key: Student.key,
                    value: Student.value,
                  })}
                >
                  {Student.value}
                </option>
              ))}
            </select>
            <select
              key={index + 2}
              name="id1"
              id="id1"
              placeholder=""
              value={selectedCourseIds[courseRelation.guid]}
              onChange={(e) => handleCourseRelationsCourseCategoryIdChange(e)}
              className="border-[1px] py-[10px] px-[7px] outline-none border-[black] rounded-[5px]"
            >
              {Array.from(courseCategories)?.map((Student) => (
                <option
                  value={JSON.stringify({
                    id: courseRelation.guid,
                    key: Student.key,
                    value: Student.value,
                  })}
                >
                  {Student.value}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeApRequest(index)}
              className="hover:text-[red]"
            >
              Remove Criteria
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleapChange}
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

export default AcademicProgramsEdit;
