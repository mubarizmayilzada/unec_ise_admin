import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsUI = () => {
  const [newsSection3, setNewsSection3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://test-api.com/api/v1/news");
        const newsItems = response.data.news.items;

        // Split the news items into three sections
        const section3 = newsItems;

        setNewsSection3(section3);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-[100%] mx-[60px]">
      <h2 className="text-[48px] text-center font-lato font-[600] mt-[36px] leading-[60px] mb-[25px] text-[#551D3B]">
        News
      </h2>
      <Link
        to={"/news/create"}
        className="flex justify-center mx-[auto] w-[300px] py-[10px] mb-[50px] px-[20px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>
      <div className="flex justify-between flex-wrap gap-[30px]">
        {newsSection3.map((article, index) => (
          <Link
            to={`/news/edit/${article.id}`}
            key={index}
            className="py-[32px] w-[475px] border-b-[1px] border-[#7F7E7E] border-dashed flex gap-[24px]"
          >
            <img
              className="w-[124px] h-[124px] rounded-[8px] object-cover"
              src={article.file} // Assuming each article's file corresponds to the image
              alt=""
            />
            <div>
              <div className="flex flex-col justify-between h-[100%]">
                <div className="">
                  <span className="text-[16px] font-[500] leading-[20px] text-[#551D3B] inline-block">
                    {article.newsCategoryName}{" "}
                    {/* Category from the current article */}
                  </span>
                  <span className="text-[#575457] inline-block mx-[10px]">
                    •
                  </span>
                  <span className="text-[16px] font-[500] leading-[20px] text-[#575457]">
                    {article.creationDate}{" "}
                    {/* Creation date from the current article */}
                  </span>
                </div>
                <div>
                  <p className="text-[24px] font-[600] leading-[30px] text-[#1A0E15]">
                    {article.title} {/* Title from the current article */}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsUI;
