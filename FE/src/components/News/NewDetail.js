import React from "react";
import JsxParser from "react-jsx-parser";
const test = `
<div className="w-full ">
  <h1 className="text-3xl text-center text-mainRed">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, laborum?
  </h1>
  <h3 className="text-xl">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam molestias
    repellendus quaerat ullam soluta assumenda.
  </h3>
  <p className="text-right">
    By <span className="text-mainRed">ipsum </span> dolor sit amet.
  </p>
</div>
<div className="w-7/12 border-b border-mainRedBlur m-auto"></div>
<div className="w-full">
  <div className="w-full flex flex-col gap-4">
    <h1 className="text-center text-4xl font-dosis font-bold">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </h1>
    <img
      src="https://photo.rever.vn/v3/get/tmBPrhhLxIkb8zsctbAagEvi7QevyEyPR6xiIUl9DUg=/750x500/image.jpg"
      alt=""
      className="w-full max-h-96 object-cover"
    />
    <p className="text-xl">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
      distinctio omnis aut doloremque perspiciatis! Ut, labore? Incidunt
      optio fugit magni? distinctio omnis aut doloremque perspiciatis! Ut,
      labore? Incidunt optio fugit magni?
    </p>
  </div>
</div>
`;

function NewDetail() {
  return (
    <div className="w-full flex flex-col gap-8 bg-lightPurple px-8 py-4 rounded-xl mt-4">
      <JsxParser className="flex flex-col gap-4" jsx={test}></JsxParser>
    </div>
  );
}

export default NewDetail;
