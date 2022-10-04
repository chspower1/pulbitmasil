import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Router/Home";
import About from "./Router/About";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
