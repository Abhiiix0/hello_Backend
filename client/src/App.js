import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className=" bg-blue-100">
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
};

export default App;
