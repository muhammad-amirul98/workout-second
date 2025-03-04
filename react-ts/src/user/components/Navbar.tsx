import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { DEFAULT_AVATAR } from "../../constant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { logOut } from "../../state/AuthSlice";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);

  const Logout = () => {
    dispatch(logOut(navigate));
  };

  const menuItems = [
    { name: "My Workouts", path: "/workout" },
    { name: "Supplements", path: "/products" },
  ];

  return (
    <div>
      <Box>
        <div className="flex items-center justify-between px-5 lg:px-10 h-[70px] border-b border-gray-300">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <IconButton>
                <MenuIcon />
              </IconButton>
              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer text-lg md:text-2xl"
              >
                Workout App
              </h1>
            </div>
            <ul className="items-center font-medium text-gray-800 hidden lg:flex cursor-pointer">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="mainCategory hover:text-[#008080] hover:border-b-2 h-[70px] px-4 border-[#008080] flex items-center"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </li>
              ))}
              <li></li>
            </ul>
          </div>
          <div>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-x-2"
            >
              <Avatar src={auth.user?.profilePicture || DEFAULT_AVATAR} />

              <h1 className="hidden lg:block logo text-lg md:text-2xl">
                {auth.user?.fullName}
              </h1>
            </Button>
            {isLargeScreen && (
              <>
                <IconButton>
                  <FitnessCenterIcon />
                </IconButton>
                <IconButton onClick={() => navigate("/wishlist")}>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartIcon />
                </IconButton>
              </>
            )}
            <Button variant="outlined" onClick={Logout}>
              Logout
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
