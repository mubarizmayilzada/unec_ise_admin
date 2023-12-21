import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseCreate = () => {
  const [courseData, setCourseData] = useState({
    coursuCreator: "",
    courceName: "",
    credit: 0,
    courseContentRequests: [],
    courseCriteriaRequests: [],
    courseİnformationRequests: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (e, index) => {
    const newContentRequests = courseData.courseContentRequests.map(
      (content, idx) => {
        if (index === idx) {
          return { ...content, topics: e.target.value };
        }
        return content;
      }
    );
    setCourseData({ ...courseData, courseContentRequests: newContentRequests });
  };

  const handleCriteriaChange = (e, index, field) => {
    const newCriteriaRequests = courseData.courseCriteriaRequests.map(
      (criteria, idx) => {
        if (index === idx) {
          return { ...criteria, [field]: e.target.value };
        }
        return criteria;
      }
    );
    setCourseData({
      ...courseData,
      courseCriteriaRequests: newCriteriaRequests,
    });
  };

  const handleInformationChange = (e, index, field) => {
    const newInformationRequests = courseData.courseİnformationRequests.map(
      (info, idx) => {
        if (index === idx) {
          return { ...info, [field]: e.target.value };
        }
        return info;
      }
    );
    setCourseData({
      ...courseData,
      courseİnformationRequests: newInformationRequests,
    });
  };

  const addContentRequest = () => {
    setCourseData({
      ...courseData,
      courseContentRequests: [
        ...courseData.courseContentRequests,
        { topics: "" },
      ],
    });
  };

  const removeContentRequest = (index) => {
    const newContentRequests = courseData.courseContentRequests.filter(
      (_, idx) => idx !== index
    );
    setCourseData({ ...courseData, courseContentRequests: newContentRequests });
  };

  const addCriteriaRequest = () => {
    setCourseData({
      ...courseData,
      courseCriteriaRequests: [
        ...courseData.courseCriteriaRequests,
        { point: "", taskType: "" },
      ],
    });
  };

  const removeCriteriaRequest = (index) => {
    const newCriteriaRequests = courseData.courseCriteriaRequests.filter(
      (_, idx) => idx !== index
    );
    setCourseData({
      ...courseData,
      courseCriteriaRequests: newCriteriaRequests,
    });
  };

  const addInformationRequest = () => {
    setCourseData({
      ...courseData,
      courseİnformationRequests: [
        ...courseData.courseİnformationRequests,
        { name: "", description: "" },
      ],
    });
  };

  const removeInformationRequest = (index) => {
    const newInformationRequests = courseData.courseİnformationRequests.filter(
      (_, idx) => idx !== index
    );
    setCourseData({
      ...courseData,
      courseİnformationRequests: newInformationRequests,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://test-api.com/api/v1/course",
        courseData
      );
      alert("Successfully Created");
      navigate("/course");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Create Course
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[25px] w-[350px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label
            className="cursor-pointer inline w-fit"
            htmlFor="coursuCreator"
          >
            Course Creator
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="coursuCreator"
            id="coursuCreator"
            value={courseData.coursuCreator}
            onChange={handleChange}
            placeholder="Course Creator"
            required
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="courceName">
            Course Name
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="text"
            name="courceName"
            id="courceName"
            value={courseData.courceName}
            onChange={handleChange}
            placeholder="Course Name"
            required
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="credit">
            Credits
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="number"
            name="credit"
            id="credit"
            value={courseData.credit}
            onChange={handleChange}
            required
          />
        </div>

        {courseData.courseContentRequests.map((content, index) => (
          <div className="flex flex-col gap-[10px]" key={index}>
            <label className="cursor-pointer inline w-fit">
              Content Topic {index + 1}
            </label>
            <input
              className="border-[1px] border-[#ccc] py-[10px] px-[7px] outline-none rounded-[5px]"
              type="text"
              value={content.topics}
              onChange={(e) => handleContentChange(e, index)}
              placeholder="Content Topic"
              required
            />
            <button
              type="button"
              onClick={() => removeContentRequest(index)}
              className="hover:text-[red]"
            >
              Remove Content
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addContentRequest}
          className="border-[1px] border-[#ccc] hover:border-[#551D3B] py-[8px] px-[10px] rounded-[5px]"
        >
          Add Content
        </button>

        {courseData.courseCriteriaRequests.map((criteria, index) => (
          <div className="flex flex-col gap-[10px]" key={index}>
            <label className="cursor-pointer inline w-fit">
              Criteria {index + 1}
            </label>
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              type="text"
              value={criteria.point}
              onChange={(e) => handleCriteriaChange(e, index, "point")}
              placeholder="Criteria Point"
              required
            />
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              type="text"
              value={criteria.taskType}
              onChange={(e) => handleCriteriaChange(e, index, "taskType")}
              placeholder="Task Type"
              required
            />
            <button
              type="button"
              onClick={() => removeCriteriaRequest(index)}
              className="hover:text-[red]"
            >
              Remove Criteria
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addCriteriaRequest}
          className="border-[1px] border-[#ccc] hover:border-[#551D3B] py-[8px] px-[10px] rounded-[5px]"
        >
          Add Criteria
        </button>

        {courseData.courseİnformationRequests.map((info, index) => (
          <div className="flex flex-col gap-[10px]" key={index}>
            <label className="cursor-pointer inline w-fit">
              Information {index + 1}
            </label>
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              type="text"
              value={info.name}
              onChange={(e) => handleInformationChange(e, index, "name")}
              placeholder="Information Name"
              required
            />
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              type="text"
              value={info.description}
              onChange={(e) => handleInformationChange(e, index, "description")}
              placeholder="Description"
              required
            />
            <button
              type="button"
              onClick={() => removeInformationRequest(index)}
              className="hover:text-[red]"
            >
              Remove Information
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addInformationRequest}
          className="border-[1px] border-[#ccc] hover:border-[#551D3B] py-[8px] px-[10px] rounded-[5px]"
        >
          Add Information
        </button>

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

export default CourseCreate;
