import React, { useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

const CourseEdit = ({ courseId }) => {
  const { register, control, handleSubmit, setValue } = useForm();

  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({ control, name: "courseContentRequests" });

  const {
    fields: criteriaFields,
    append: appendCriteria,
    remove: removeCriteria,
  } = useFieldArray({ control, name: "courseCriteriaRequests" });

  const {
    fields: informationFields,
    append: appendInformation,
    remove: removeInformation,
  } = useFieldArray({ control, name: "courseİnformationRequests" });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://test-api.com/api/v1/course/${courseId}`
        );
        const data = response.data;
        for (const key in data) {
          if (Array.isArray(data[key])) {
            data[key].forEach((item, index) => {
              for (const field in item) {
                setValue(`${key}[${index}].${field}`, item[field]);
              }
            });
          } else {
            setValue(key, data[key]);
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://test-api.com/api/v1/course/${courseId}`,
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <section className="flex flex-col mx-[100px] my-[25px] items-left w-[100%]">
      <h1 className="flex justify-center text-[28px] font-[500] mb-[30px]">
        Edit Course
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("coursuCreator")}
            placeholder="Course Creator"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="courceName">
            Course Name
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            {...register("courceName")}
            placeholder="Course Name"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="cursor-pointer inline w-fit" htmlFor="credit">
            Credits
          </label>
          <input
            className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
            type="number"
            {...register("credit")}
          />
        </div>
        {contentFields.map((field, index) => (
          <div className="flex flex-col gap-[10px]" key={field.id}>
            <label className="cursor-pointer inline w-fit">
              Content Topic {index + 1}
            </label>
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              {...register(`courseContentRequests.${index}.topics`)}
              placeholder="Content Topic"
            />
            <button type="button" onClick={() => removeContent(index)}>
              Remove Content
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendContent({ topics: "" })}>
          Add Content
        </button>

        {criteriaFields.map((field, index) => (
          <div className="flex flex-col gap-[10px]" key={field.id}>
            <label className="cursor-pointer inline w-fit">
              Criteria {index + 1}
            </label>
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              {...register(`courseCriteriaRequests.${index}.point`)}
              placeholder="Criteria Point"
            />
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              {...register(`courseCriteriaRequests.${index}.taskType`)}
              placeholder="Task Type"
            />
            <button type="button" onClick={() => removeCriteria(index)}>
              Remove Criteria
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendCriteria({ point: "", taskType: "" })}
        >
          Add Criteria
        </button>

        {informationFields.map((field, index) => (
          <div className="flex flex-col gap-[10px]" key={field.id}>
            <label className="cursor-pointer inline w-fit">
              Information {index + 1}
            </label>
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              {...register(`courseİnformationRequests.${index}.name`)}
              placeholder="Information Name"
            />
            <input
              className="border-[1px] py-[10px] px-[7px] outline-none border-[#ccc] rounded-[5px]"
              {...register(`courseİnformationRequests.${index}.description`)}
              placeholder="Description"
            />
            <button type="button" onClick={() => removeInformation(index)}>
              Remove Information
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendInformation({ name: "", description: "" })}
        >
          Add Information
        </button>

        <button
          type="submit"
          className="border-[1px] border-[#551D3B] text-[white] bg-[#551D3B] hover:bg-[#361326] py-[10px] px-[7px] rounded-[5px]"
        >
          Update Course
        </button>
      </form>
    </section>
  );
};

export default CourseEdit;
