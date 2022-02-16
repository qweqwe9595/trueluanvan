import React from "react";
import { FaAngleRight } from "react-icons/fa";
const dummy = [
  {
    name: "ipsum dolor",
    age: 18,
    img:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTZE6ZxVumFL3ga6AiETDuiRobav4wFmLjcBf9D1D85Q_B2zk5wlNlw-UrcI4f",
  },
  {
    name: "ipsum dolor",
    age: 18,
    img:
      "https://i.pinimg.com/originals/56/4d/98/564d98bac1b11051cb3180b7d0fed6c4.jpg",
  },
  {
    name: "ipsum dolor",
    age: 18,
    img:
      "https://image.thanhnien.vn/w1024/Uploaded/2022/abfluao/2020_08_19/h1_pcva.jpg",
  },
  {
    name: "ipsum dolor",
    age: 18,
    img:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTZE6ZxVumFL3ga6AiETDuiRobav4wFmLjcBf9D1D85Q_B2zk5wlNlw-UrcI4f",
  },
];

function CelebritiesSection() {
  return (
    <div className="h-fit flex-1 shrink-0">
      <h1 className="mt-8 text-2xl font-bold">Most Search Celebrites</h1>
      <hr className="mt-2 border-mainRed " />
      <div className="flex flex-col mt-4 gap-4">
        {dummy.map((e, i) => {
          return (
            <div
              key={i}
              className="flex pl-3 py-1 hover:bg-mainRed hover:rounded cursor-pointer"
            >
              <img
                src={e.img}
                alt=""
                className="h-14 w-14 object-cover rounded-full"
              />
              <div className="ml-2">
                <h1 className="font-bold capitalize">{e.name}</h1>
                <p className="text-yellow">{e.age}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center mt-4">
        See all Celebrities <FaAngleRight className="text-2xl text-mainRed" />
      </div>
    </div>
  );
}

export default CelebritiesSection;
