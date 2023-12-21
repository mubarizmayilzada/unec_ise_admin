import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventUI = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://test-api.com/api/v1/event");
        setEvents(response.data.event.items); // Update state with fetched event items
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mb-[100px] mx-[60px]">
      <h2 className="text-[48px] text-center font-lato font-[600] mt-[36px] leading-[60px] mb-[25px] text-[#551D3B]">
        Events
      </h2>
      <Link
        to={"/event/create"}
        className="flex justify-center mx-[auto] w-[300px] py-[10px] mb-[50px] px-[20px] bg-[teal] hover:bg-[#387272] text-[white] text-[16px] font-[500] rounded-[8px]"
      >
        Create New
      </Link>
      <div className="flex justify-center flex-wrap gap-[50px] ">
        {events.map((event) => (
          <Link
            to={`/event/edit/${event.id}`}
            key={event.id}
            className="w-[304px] rounded-[8px]"
          >
            <div className="relative">
              <img
                className="h-[200px] w-[100%] rounded-t-[8px] object-cover"
                src={event.file}
                alt={event.title}
              />
              <div className="absolute left-[17px] bg-[#551D3B] bottom-[0px] w-[83px] h-[20px] rounded-t-[6px]"></div>
            </div>
            <div className="px-[16px] py-[13px] pt-[0px] rounded-[8px] border-[#7F7E7E] border-[1px] border-t-[0px] rounded-t-[0px]">
              <div className="flex justify-between gap-[16px] items-center">
                <div className="w-[83px] flex justify-center items-center h-[75px] bg-[#FCFBFC] rounded-b-[6px]">
                  <p className="w-[60px] text-center text-[24px] font-[500] leading-[23px]">
                    {event.creationMonth}
                  </p>
                </div>
                <h2 className="w-[170px] text-[24px] font-[700] leading-[30px]">
                  {event.title}
                </h2>
              </div>
              <p className="mt-[15px] text-[#7F7E7E] text-[16px] font-[500] leading-[20px] mb-[24px]">
                {event.creationHour}, {event.description}
              </p>
              <a
                href={event.link}
                className="inline-block text-center text-[#FFFDFD] w-[100%] py-[12px] px-[24px] text-[16px] font-[600] rounded-[8px] bg-[#551D3B]"
                rel="stylesheet"
              >
                Join
              </a>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventUI;
