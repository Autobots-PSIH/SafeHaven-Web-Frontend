import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { LogOut } from "lucide-react";

const menuItemsAdmin = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Manage Shelters",
    path: "../manage",
  },
  {
    name: "Volunteers",
    path: "../volunteers",
  },
];

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Donate",
    path: "../donate",
  },
];

export function Header({ isLoggedIn }) {
  const navigate = useNavigate();
  const menu_display = isLoggedIn ? menuItemsAdmin : menuItems;
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img src={logo} width={30} />
          </span>
          <span className="font-bold">SafeHaven.</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menu_display.map((item) => (
              <li key={item.name} style={{ cursor: "pointer" }}>
                <a
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {isLoggedIn ? (
            <>
              <button
                title="Logout"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                  window.location.reload();
                }}
              >
                <LogOut />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
