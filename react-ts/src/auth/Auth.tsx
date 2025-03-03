import { useState } from "react";
import background from "../assets/background.jpeg";
import Login from "./Login";
import Register from "./Register";
import { Button } from "@mui/material";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[85vh] rounded-md shadow-lg">
        <img className="rounded-t-md" src={background} alt="" />
        {isLogin ? <Login /> : <Register />}
        <div className="flex items-center gap-1 justify-center">
          <p>
            {isLogin ? "Don't have an account? " : "Have an account? "}
            <Button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Log In"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
