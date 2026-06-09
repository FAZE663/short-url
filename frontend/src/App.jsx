import { Route ,Routes } from "react-router-dom";
import React from 'react'
import Home from "../pages/Home";
import ErrorPage from "../pages/error";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  )
}
