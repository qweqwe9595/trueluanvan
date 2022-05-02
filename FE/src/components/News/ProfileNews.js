import React from "react";

function ProfileNews() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl ">YOUR REVIEWS</h1>
      {/* {reviewDetail.map((item) => {
        const date = dateFormat(item?.review?.createdAt, "fullDate") || "";

        return (
          <div
            key={item.id}
            className="mt-5 px-4 bg-mainPurple rounded-2xl py-6 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1 w-8/12">
              <p className="px-4 py-1 rounded-2xl bg-white text-mainRed font-bold">
                {item?.title}
              </p>
              <h3 className="flex-1 text-md break-normal">
                {item?.review?.review}
              </h3>
            </div>
            <h3 className="w-4/12">{date}</h3>
          </div>
        );
      })} */}
      {/* 
      <Link
        to={"/reviews"}
        className="flex items-center gap-2 cursor-pointer mt-4"
      >
        Show {reviews && reviews.length > 10 ? reviews.length - 5 : 0} Mores
        <FaAngleDoubleRight className="text-mainRed text-xl" />
      </Link> */}
    </div>
  );
}

export default ProfileNews;
