import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logout } from "features/users/UserSlice";

const SignOutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("Abmelden");
    dispatch(logout());
  };

  return <Button onClick={handleClick}>Abmelden</Button>;
};

export default SignOutButton;
