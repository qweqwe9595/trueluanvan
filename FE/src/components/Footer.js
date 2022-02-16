import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full">
      <div>
        <h1>Follow us</h1>
        <FaFacebookSquare />
        <FaTwitterSquare />
      </div>
      <div></div>
    </div>
  );
}

export default Footer;
