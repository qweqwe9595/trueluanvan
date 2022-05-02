import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const [active, setActive] = useState(0);

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            href="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block"
          >
            <H6 className="text-mainPurple">Admin Site</H6>
          </a>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <Link
                  to="/admin"
                  className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                    active === 0 &&
                    "bg-gradient-to-tr from-lightPurple to-mainPurple text-white shadow-md"
                  } `}
                  onClick={() => setActive(0)}
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </Link>
              </li>

              <li className="rounded-lg mb-2 ">
                <Link
                  to="/admin/news"
                  className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                    active === 2 &&
                    "bg-gradient-to-tr from-lightPurple to-mainPurple text-white shadow-md"
                  } `}
                  onClick={() => setActive(2)}
                >
                  <Icon name="menu_book" size="2xl" />
                  News
                </Link>
              </li>
              <li className="rounded-lg mb-2 ">
                <Link
                  to="/admin/rates"
                  className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                    active === 3 &&
                    "bg-gradient-to-tr from-lightPurple to-mainPurple text-white shadow-md"
                  } `}
                  onClick={() => setActive(3)}
                >
                  <Icon name="stars" size="2xl" />
                  Rates
                </Link>
              </li>
              <li className="rounded-lg mb-2 ">
                <Link
                  to="/admin/reviews"
                  className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                    active === 4 &&
                    "bg-gradient-to-tr from-lightPurple to-mainPurple text-white shadow-md"
                  } `}
                  onClick={() => setActive(4)}
                >
                  <Icon name="local_activity" size="2xl" />
                  Reviews
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/admin/settings"
                  className={`flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg ${
                    active === 1 &&
                    "bg-gradient-to-tr from-lightPurple to-mainPurple text-white shadow-md"
                  } `}
                  onClick={() => setActive(1)}
                >
                  <Icon name="settings" size="2xl" />
                  Settings
                </Link>
              </li>
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                <a
                  href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 text-sm font-light py-3"
                >
                  Free Download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
