import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  fab: {
    position: "fixed",
  },
});

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Fab onClick={onClick} className={classes.fab} color="primary">
      <AddIcon />
    </Fab>
  );
};

export default FloatingAddButton;
