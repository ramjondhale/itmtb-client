import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFieldValues, validateOnChange = false) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  //function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };
  //function handle selection in button group
  const handleSelection = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  //Function for reseting form inputs
  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };
  //Custom Validation for form input
  const validate = (fieldValues, type = "onChange") => {
    let temp = { ...errors };
    if ("productName" in fieldValues)
      temp.productName = fieldValues.productName
        ? ""
        : "This field is required";
    if ("expiry" in fieldValues)
      if (
        fieldValues.productName === "options" ||
        fieldValues.productName === "futures"
      ) {
        temp.expiry = fieldValues.expiry ? "" : "This field is required";
      }
    if ("instrument" in fieldValues)
      temp.instrument = fieldValues.instrument ? "" : "This field is required";
    if ("recReason" in fieldValues)
      temp.recReason = fieldValues.recReason ? "" : "This field is required";
    if ("recDisclosure" in fieldValues)
      temp.recDisclosure = fieldValues.recDisclosure
        ? ""
        : "This field is required";
    if ("tradePrice" in fieldValues)
      if (fieldValues.tradePrice) {
        temp.tradePrice =
          parseInt(fieldValues.tradePrice) <= 0
            ? "Trade Price should be greater than zero"
            : "";
      } else temp.tradePrice = "This field is required";

    if ("quantity" in fieldValues)
      if (fieldValues.quantity) {
        temp.quantity =
          parseInt(fieldValues.quantity) <= 0
            ? "Quantity should be greater than zero"
            : "";
      } else temp.quantity = "This field is required";

    if ("stopLoss" in fieldValues) {
      if (fieldValues.stopLoss) {
        const stopLoss = parseInt(fieldValues.stopLoss);
        if (stopLoss <= 0)
          temp.stopLoss = "Trade Price should be greater than zero";
        else if (fieldValues.buyOrSell === "buy") {
          if (stopLoss >= fieldValues.tradePrice)
            temp.stopLoss = "Stop Loss should be smaller than trade price";
          else temp.stopLoss = "";
        } else {
          if (stopLoss <= fieldValues.tradePrice)
            temp.stopLoss = "Stop Loss should be larger than trade price";
          else temp.stopLoss = "";
        }
      } else temp.stopLoss = "This field is required";
    }
    if ("target" in fieldValues) {
      if (fieldValues.target) {
        const target = parseInt(fieldValues.target);
        if (target <= 0) temp.target = "Target should be greater than zero";
        else if (fieldValues.buyOrSell === "buy") {
          if (target <= fieldValues.tradePrice)
            temp.target = "Target should be larger than trade price";
          else temp.target = "";
        } else {
          if (target >= fieldValues.tradePrice)
            temp.target = "Target should be smaller than trade price";
          else temp.target = "";
        }
      } else temp.target = "This field is required";
    }

    setErrors({
      ...temp,
    });
    if (type === "onSubmit") return Object.values(temp).every((x) => x === "");
  };

  return {
    values,
    setValues,
    errors,
    validate,
    setErrors,
    handleInputChange,
    handleSelection,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

//reusable form component
export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {children}
    </form>
  );
}
