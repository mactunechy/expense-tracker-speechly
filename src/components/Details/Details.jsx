import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import useTransactions from "../../useTransactions";
import { useStyles } from "./styles";

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title);

  console.log({ total, chartData });
  return (
    <Card className={classes[title]}>
      <CardHeader title={title} />
      <CardContent>
        <Typography align="center" className={classes.title} variant="h3">
          ${total}
        </Typography>
        <Doughnut data={chartData} height={200} />
      </CardContent>
    </Card>
  );
};

export default Details;
