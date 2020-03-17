import { createShortLink, ShortLinkBase } from "features/links/ShortLinkSlice";
import React from "react";
import { useDispatch } from "react-redux";
import LinkForm from "./LinkForm";
import { Typography } from "@material-ui/core";
import myhistory from "myhistory";

const CreateLinkPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: ShortLinkBase) => {
    dispatch(createShortLink(values));
    myhistory.push("/");
  };

  return (
    <>
      <Typography variant="h3">Erstelle einen neuen Kurzlink</Typography>

      <LinkForm handleSubmit={handleSubmit} />
    </>
  );
};

export default CreateLinkPage;
