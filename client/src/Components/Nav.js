// Nav.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  GlobeAmericasIcon,
  UserGroupIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  {
    title: "About Us",
    description: "Learn about our journey and mission",
    icon: UserGroupIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Get in touch with us",
    icon: PhoneIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="/" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg bg-gray-100 p-2">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-700 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              className="text-sm font-semibold text-gray-900"
            >
              {title}
            </Typography>
            <Typography className="text-xs font-medium text-gray-600">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-medium text-gray-200"
          ></Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-white shadow-lg">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="max-auto mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-gray-200">
      <Typography
        as="a"
        href="/"
        variant="small"
        className="font-medium text-gray-200"
      ></Typography>
      <NavListMenu />
    </List>
  );
}

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleGetStarted = () => navigate("/signup");

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="fixed abc">
      <Navbar className="bg-gray-800 shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between text-gray-200">
          <Typography
            as="a"
            href="/"
            variant="h5"
            className="mr-4 cursor-pointer font-bold text-teal-300"
          >
            Quiz Adventure
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <Button
              onClick={handleGetStarted}
              variant="gradient"
              color="cyan"
              size="sm"
            >
              Get Started
            </Button>
            <Button
              className="loginbutton"
              onClick={handleLogin}
              variant="text"
              size="sm"
              color="#CA4FB5"
            >
              Log In
            </Button>
          </div>
          <IconButton
            variant="text"
            color="gray-200"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button
              className="loginbutton"
              variant="outlined"
              color="#C253BF"
              size="sm"
              fullWidth
            >
              Log In
            </Button>
            <Button variant="gradient" color="cyan" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
