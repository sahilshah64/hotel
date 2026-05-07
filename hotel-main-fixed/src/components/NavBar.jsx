import { HouseHeart, Menu, X, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const go = (path) => { navigate(path); setOpen(false); };

  return (
    <div className="w-full px-4 bg-[#84B179] border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">

        {/* LOGO */}
        <h1 onClick={() => go("/")} className="flex items-center font-bold text-white cursor-pointer text-lg">
          <HouseHeart className="text-[#E8F5BD] mr-1" />
          lonely
        </h1>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-6 text-sm text-white">
          <li onClick={() => go("/")}           className="hover:underline cursor-pointer">Homepage</li>
          <li onClick={() => go("/activities")} className="hover:underline cursor-pointer">Activities</li>
          <li onClick={() => go("/aboutus")}    className="hover:underline cursor-pointer">About</li>
          <li onClick={() => go("/rooms")}      className="hover:underline cursor-pointer">Rooms</li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-2 text-sm items-center">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-[#E8F5BD] text-sm flex items-center gap-1">
                <User size={14} /> {user.name}
              </span>
              <button onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-xl font-semibold flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => go("/login")}
                className="px-4 py-2 bg-[#E8F5BD] rounded-xl text-[#84B179] font-semibold">Log in</button>
              <button onClick={() => go("/contact")}
                className="px-4 py-2 bg-black text-white rounded-xl font-semibold">Contact</button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#84B179] px-4 pb-4">
          <ul className="flex flex-col gap-4 text-white text-sm mb-4">
            <li onClick={() => go("/")}>Homepage</li>
            <li onClick={() => go("/activities")}>Activities</li>
            <li onClick={() => go("/aboutus")}>About</li>
            <li onClick={() => go("/rooms")}>Rooms</li>
          </ul>
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <p className="text-[#E8F5BD] text-sm">Signed in as {user.name}</p>
                <button onClick={handleLogout}
                  className="w-full px-4 py-2 bg-black text-white rounded-xl font-semibold">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => go("/login")}
                  className="w-full px-4 py-2 bg-[#E8F5BD] rounded-xl text-[#84B179] font-semibold">Log in</button>
                <button onClick={() => go("/contact")}
                  className="w-full px-4 py-2 bg-black text-white rounded-xl font-semibold">Contact</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
