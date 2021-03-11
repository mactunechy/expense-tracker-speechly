import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./styles";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";
import { useSpeechContext } from "@speechly/react-client";

import { ExpenseTrackerContext } from "../../../context/context";
import {
  expenseCategories,
  incomeCategories,
} from "../../../constants/categories";
import CustomizedSnackbar from "../../Snackbar/Snackbar";

const initialState = {
  type: "Income",
  amount: "",
  category: "",
  date: moment(new Date()).format("YYYY-MM-DD"),
};

const Form = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const { addTransaction } = useContext(ExpenseTrackerContext);

  const { segment } = useSpeechContext();

  const handleChange = (e) => {
    e.persist();

    let value = e.target.value;
    const name = e.target.name;
    if (name === "date") value = moment(value).format("YYYY-MM-DD");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;
    const transaction = { ...formData, id: uuidV4() };

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: "Income" });
    } else if (
      expenseCategories.map((iC) => iC.type).includes(formData.category)
    ) {
      setFormData({ ...formData, type: "Expense" });
    }

    addTransaction(transaction);
    setFormData(initialState);
    setOpen(true);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setFormData({ ...formData, amount: s.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type.toLowerCase() === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography
          className={classes.segment}
          gutterBottom
          variant="subtitle2"
          align="center"
        >
          {segment?.words.map((word) => word.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button className={classes.button} onClick={createTransaction}>
          Create
        </Button>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} name="type" onChange={handleChange}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={handleChange}
            name="category"
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          value={formData.date}
          onChange={handleChange}
          name="date"
          type="date"
          label="Date"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Form;
