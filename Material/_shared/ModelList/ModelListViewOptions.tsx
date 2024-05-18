import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  viewOptionContainer: {
    // Add your styles here
  },
  viewOption: {
    // Add your styles here
  },
  viewOptionSelected: {
    // Add your styles here
  }
});

interface ModelListViewOptionsProps {
  viewOption: number;
  setViewOption: (option: number) => void;
  classes?: any; // Replace with the appropriate type if using a specific styling solution
}

/**
 * Renders the view options for the model list view.
 *
 * @param {Object} props - The component props.
 * @param {number} props.viewOption - The currently selected view option.
 * @param {Function} props.setViewOption - The function to set the view option.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @returns {JSX.Element} The rendered view options.
 */
const ModelListViewOptions: React.FC<ModelListViewOptionsProps> = ({ viewOption, setViewOption, classes }) => {
  const localClasses = useStyles();

  return (
    <Grid
      className={classes ? classes.viewOptionContainer : localClasses.viewOptionContainer}
      container
      justifyContent="flex-end"
    >
      <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 0 ? (classes ? classes.viewOptionSelected : localClasses.viewOptionSelected) : (classes ? classes.viewOption : localClasses.viewOption)
            }
            onClick={() => setViewOption(0)}
          >
            Grid
          </Button>
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 1 ? (classes ? classes.viewOptionSelected : localClasses.viewOptionSelected) : (classes ? classes.viewOption : localClasses.viewOption)
            }
            onClick={() => setViewOption(1)}
          >
            Table
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ModelListViewOptions;
