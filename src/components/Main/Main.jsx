import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { ExpenseTrackerContext } from "../../context/context";
import Form from "./Form/Form";
import InfoCard from "./InfoCard";
import List from "./List/List";
import { useStyles } from "./styles";

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" subheader="powered by speechly" />
      <CardContent>
        <Typography variant="h6">
          Total balance: ${balance.toFixed(2)}
        </Typography>
        <Divider className={classes.divider} />

        <Typography variant="caption" className={classes.info}>
          <InfoCard />
        </Typography>
        <Divider className={classes.divider} />
        <Form />
        <Divider className={classes.divider} />
        <CardContent className={classes.CardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List />
            </Grid>
          </Grid>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Main;
