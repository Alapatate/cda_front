import React from "react";
import { MoonLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <MoonLoader color="#000" size={50} />
    </div>
  );
};
