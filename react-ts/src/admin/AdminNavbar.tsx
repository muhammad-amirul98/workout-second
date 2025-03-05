import { Avatar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { logOut } from "../state/AuthSlice";
import { useAppDispatch, useAppSelector } from "../state/store";
import { DEFAULT_AVATAR } from "../constant";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);

  const Logout = () => {
    dispatch(logOut(navigate));
  };

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
            {/* <ul className="items-center font-medium text-gray-800 hidden lg:flex cursor-pointer">
                  
                </ul> */}
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
            <Button variant="outlined" onClick={Logout}>
              Logout
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AdminNavbar;
