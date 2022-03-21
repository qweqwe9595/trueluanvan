import React, { useState, useEffect } from "react";

function Video({ path }) {
  return (
    <iframe
      className="h-60 w-96 rounded-lg shrink-0 cursor-pointer relative"
      src={`https://www.youtube.com/embed/${path}`}
      frameBorder="0"
    ></iframe>
  );
}

export default Video;
