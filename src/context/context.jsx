import React, { createContext, useReducer } from "react";
import {
  ADD_TRANSACTION,
  contextReducer,
  DELETE_TRANSACTION,
} from "./contextReducer";

export const ExpenseTrackerContext = createContext();

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //Action creators
  const deleteTransaction = (id) =>
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  const addTransaction = (transaction) =>
    dispatch({ type: ADD_TRANSACTION, payload: transaction });

  const balance = transactions.reduce(
    (acc, currentValue) =>
      currentValue.type == "Income"
        ? acc + parseFloat(currentValue.amount)
        : acc - parseFloat(currentValue.amount),
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        deleteTransaction,
        addTransaction,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
