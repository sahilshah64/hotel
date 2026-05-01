import { HouseHeart, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full px-4 bg-[#84B179] border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="flex items-center font-bold text-white cursor-pointer text-lg"
        >
          <HouseHeart className="text-[#E8F5BD] mr-1" />
          lonely
        </h1>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-6 text-sm text-white">
          <li onClick={() => navigate("/")} className="hover:underline cursor-pointer">
            Homepage
          </li>
          <li onClick={() => navigate("/activities")} className="hover:underline cursor-pointer">
            Activities
          </li>
          <li onClick={() => navigate("/aboutus")} className="hover:underline cursor-pointer">
            About
          </li>
          <li onClick={() => navigate("/rooms")} className="hover:underline cursor-pointer">
            Rooms
          </li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-2 text-sm">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-[#E8F5BD] rounded-xl text-[#84B179] font-semibold"
          >
            Log in
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-4 py-2 bg-black text-white rounded-xl font-semibold"
          >
            Contact
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#84B179] px-4 pb-4">
          <ul className="flex flex-col gap-4 text-white text-sm mb-4">
            <li onClick={() => {navigate("/"); setOpen(false);}}>Homepage</li>
            <li onClick={() => {navigate("/activities"); setOpen(false);}}>Activities</li>
            <li onClick={() => {navigate("/aboutus"); setOpen(false);}}>About</li>
            <li onClick={() => {navigate("/rooms"); setOpen(false);}}>Rooms</li>
          </ul>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {navigate("/login"); setOpen(false);}}
              className="w-full px-4 py-2 bg-[#E8F5BD] rounded-xl text-[#84B179] font-semibold"
            >
              Log in
            </button>

            <button
              onClick={() => {navigate("/contact"); setOpen(false);}}
              className="w-full px-4 py-2 bg-black text-white rounded-xl font-semibold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;