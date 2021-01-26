import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
export function useForm(
  initialFieldValues,
  validate,
  validateOnChange = false
) {
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
      width: "95%",
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
