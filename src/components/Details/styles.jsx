import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  income: {
    borderBottom: "solid #20bb1b 5px",
  },
  expense: {
    borderBottom: "solid tomato 5px",
  },
  title: {
    textTransform: "capitalize",
  },
}));
