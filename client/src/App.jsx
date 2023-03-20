import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";

// * Import React Components
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>

      {/* Page Body Content */}
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        {/* Create Routes (Frontend) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

// * <BrowserRouter>
// It stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.
// It is a router implementation that uses the HTML5 history API (pushstate, replacestate, and popstate events) to keep your UI in sync with the URL.
// It is the parent component used to store all other components.
