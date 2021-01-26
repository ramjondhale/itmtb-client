import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DatefnUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, label, value, onChange, ...other } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DatefnUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        label={label}
        format='dd/MM/yyyy'
        name={name}
        value={value}
        {...other}
        onChange={(date) => onChange(convertToDefEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
