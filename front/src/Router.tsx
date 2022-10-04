import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Router/Home";
import About from "./Router/About";
import Nav from "./components/Nav";
import Map from "./Router/Map";

export default function Router() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </BrowserRouter>
    );
}
