import React from "react";

function PollGenerality() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl">YOUR RECENTLY TAKEN POLLS</h1>
      <ul className="list-decimal pl-6">
        <li className="cursor-pointer hover:text-mainRed">Poll 1</li>
        <li className="cursor-pointer hover:text-mainRed">Poll 1</li>
        <li className="cursor-pointer hover:text-mainRed">Poll 1</li>
      </ul>
      <p>Total polls taked: 3</p>
    </div>
  );
}

export default PollGenerality;
