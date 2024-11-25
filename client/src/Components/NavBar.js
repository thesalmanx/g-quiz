"use client";
import { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

export default function NavBar({ onToggleSidebar }) {
  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:6005/users/success",
          {
            headers: { Authorization: token },
          }
        );
        setUserdata(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.open("http://localhost:6005/logout", "_self");
  };

  const displayName =
    userdata?.displayName ||
    `${userdata?.firstname || ""} ${userdata?.lastname || ""}`.trim() ||
    userdata?.username ||
    "User";

  useEffect(() => {
    document.title = `${displayName}'s Quiz App`;
  }, [displayName]);

  return (
    <Navbar
      fluid
      rounded
      className="shadow-md"
      style={{
        background: "linear-gradient(90deg, #C552BC, #7A3E93, #3F275D)",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Navbar.Brand href="#">
        <button onClick={onToggleSidebar} className="text-white">
          <BsReverseLayoutTextSidebarReverse className="mr-4" />
        </button>
        <span className="self-center whitespace-nowrap text-xl font-bold text-white">
          G Quiz
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center gap-4">
        <h1 className="bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md font-semibold">
          {`${displayName}'s Notebook`}
        </h1>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={userdata?.image}
              rounded
              className="shadow-lg"
            />
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">
              {userdata?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={IoMdSettings}>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} icon={IoIosLogOut}>
            Logout
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse></Navbar.Collapse>
    </Navbar>
  );
}
