import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const ErrorMessage: React.FC = () => {
  const error = useSelector((state: RootState) => state.users.error);

  return error ? <div>Error: {error}</div> : null;
};

export default ErrorMessage;
