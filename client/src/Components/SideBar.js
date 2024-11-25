import React from "react";
import { Badge, Sidebar } from "flowbite-react";
import { FaNotesMedical } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

export default function SideBar({ showElement }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.open("http://localhost:6005/logout", "_self");
  };

  return (
    <Sidebar>
      <Sidebar.Items
        className={`flex flex-col ${showElement ? "pl-01" : "items-center"}`}
      >
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={FaNotesMedical} active>
            {showElement && <h1 className="text12">Quiz</h1>}
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={IoIosLogOut}>
            {showElement && (
              <h1 className="text11" onClick={handleLogout}>
                Logout
              </h1>
            )}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      {showElement && (
        <Sidebar.CTA className="pl-4 xxff">
          <div className="mb-3 flex items-center ">
            <Badge color="warning">Beta</Badge>
            <button
              aria-label="Close"
              className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-white-100 p-1 text-white-900 hover:bg-white-200 focus:ring-2 focus:ring-white-400 dark:bg-white-700 dark:text-white-400 dark:hover:bg-white-600"
              type="button"
            >
              <svg
                aria-hidden
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mb-3 text-sm text-white-900 dark:text-white-400 ">
            G Notes is in beta version. Please check our page for more
            information.
          </div>
          <a
            className="text-sm text-white-900 underline hover:text-white-800 dark:text-white-400 dark:hover:text-white-300"
            href="https://blog.salmann.dev"
          >
            Visit this page
          </a>
        </Sidebar.CTA>
      )}
    </Sidebar>
  );
}
