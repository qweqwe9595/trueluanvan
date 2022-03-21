import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full border-t-2 border-mainRed mt-6 flex flex-col items-center py-4 px-5">
      <div className="flex font-bold gap-10">
        <span>Term of use</span>
        <span>Term of use</span>
        <span>Term of use</span>
      </div>
      <div className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolore
        eligendi, minima tempore, perspiciatis aut officiis accusamus quo,
        necessitatibus a suscipit numquam doloremque soluta ipsum dolor dolorem
        fugiat atque quisquam molestiae magnam corrupti voluptatum repellendus.
        Quo assumenda, placeat animi reprehenderit sed magnam iure omnis
        incidunt numquam provident tempora modi dicta!
      </div>
      <div>
        <h1 className="font-bold">Follow for more</h1>
        <div className="flex w-full justify-center text-mainRed gap-4">
          <FaFacebookSquare className="text-4xl cursor-pointer" />
          <FaTwitterSquare className="text-4xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
