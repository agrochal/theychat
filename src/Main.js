import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "40px",
    padding: theme.spacing(3, 2),
    textAlign: "center",
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h4">
        TheyChat
      </Typography>
      <Form />
    </Paper>
  );
}
