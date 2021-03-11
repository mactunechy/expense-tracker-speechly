import React, { useContext } from "react";
import {
  Avatar,
  IconButton,
  List as MUList,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { Delete, MoneyOff } from "@material-ui/icons";
import { ExpenseTrackerContext } from "../../../context/context";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);
  return (
    <MUList dense={false} className={classes.list}>
      {transactions.map((transaction) => {
        return (
          <Slide
            direction="down"
            in
            mountOnEnter
            unmountOnExit
            key={transaction.id}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={
                    transaction.type.toLowerCase() === "income"
                      ? classes.avatarIncome
                      : classes.avatarExpense
                  }
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category}
                secondary={`$${transaction.amount} - ${transaction.date}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  eage="end"
                  aria-label="delete"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        );
      })}
      {transactions.length === 0 && (
        <Typography className={classes.empty} variant="h5" align="center">
          You haven't added any transactions yet -__-
        </Typography>
      )}
    </MUList>
  );
};

export default List;
