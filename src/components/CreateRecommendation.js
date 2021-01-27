import React, { useState } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { useForm, Form } from "./common/useForm";
import Notification from "./common/Notification";
import Controls from "./controls/Controls";
import axios from "axios";
import validateForm from "./FormValidation";

//Option values for radio button
const radioOptions = [
  { id: "ce", title: "CE" },
  { id: "pe", title: "PE" },
];

//Option values for product dropdown
const productOptions = [
  { id: "investment", title: "Investments" },
  { id: "futures", title: "Futures" },
  { id: "options", title: "Options" },
];

//Option values for expiry dropdown
const expiryOptions = [
  { id: "jan21", title: "Jan21" },
  { id: "feb21", title: "Feb21" },
  { id: "march21", title: "March21" },
];

//Option values for  instrument dropdown
const instrumentOptions = [
  { id: "RELIANCE", title: "RELIANCE" },
  { id: "BHARTI AIRTEL", title: "BHARTI AIRTEL" },
  { id: "VODAFONE IDEA", title: "VODAFONE IDEA" },
];

//Options values for Strike Price dropdown
const strikePriceOptions = [
  { id: 2000, title: "2000" },
  { id: 3000, title: "3000" },
  { id: 4000, title: "4000" },
];

//Initial states
const currentDate = new Date();
const initialFieldValues = {
  productName: "",
  radioOptions: "",
  expiry: "",
  strikePrice: "",
  buyOrSell: "buy",
  movingOrClosing: "moving",
  instrument: "",
  recReason: "",
  tradePrice: "",
  stopLoss: "",
  target: "",
  quantity: "",
  recValidity: new Date().setDate(currentDate.getDate() + 10),
  recDisclosure: "",
};

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));

export default function CreateRecommendation() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //function for validating user input
  const validate = (fieldValues, type = "onChange", fvalues = values) => {
    const temp = validateForm(fieldValues, errors, fvalues);
    setErrors({
      ...temp,
    });
    if (type === "onSubmit") return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    handleInputChange,
    handleSelection,
    resetForm,
    setErrors,
  } = useForm(initialFieldValues, validate, true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(values, "onSubmit")) {
      setLoading(true);
      const response = await axios.post(
        "https://itmtb-project.herokuapp.com/recommendation",
        values
      );
      console.log(response.data);
      setNotify({
        isOpen: true,
        message: `Recommendation id: ${response.data._id} submitted successfully `,
        type: "success",
      });
      setLoading(false);
      resetForm();
    }
  };
  return (
    <Paper className={classes.pageContent}>
      <Typography variant='h4' align='center'>
        Recommendation Form
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item sm={6}>
            <Controls.Select
              name='productName'
              label='Product Name'
              value={values.productName}
              onChange={handleInputChange}
              error={errors.productName}
              options={productOptions}
            />
            {(values.productName === "options" ||
              values.productName === "futures") && (
              <Controls.Select
                name='expiry'
                label='Expiry'
                value={values.expiry}
                onChange={handleInputChange}
                error={errors.expiry}
                options={expiryOptions}
              />
            )}
            {values.productName === "options" && (
              <Controls.RadioGroup
                name='radioOptions'
                label='Options'
                value={values.radioOptions}
                onChange={handleInputChange}
                items={radioOptions}
              />
            )}
            {values.productName === "options" && (
              <Controls.Select
                name='strikePrice'
                label='Strike Price'
                value={values.strikePrice}
                onChange={handleInputChange}
                error={errors.strikePrice}
                options={strikePriceOptions}
              />
            )}
            <Typography variant='subtitle1'>
              Is it a Buy call or Sell call?
            </Typography>

            <Controls.Button
              text='Buy'
              color={values.buyOrSell === "buy" ? "primary" : "default"}
              onClick={() => handleSelection("buyOrSell", "buy")}
            />
            <Controls.Button
              text='Sell'
              color={values.buyOrSell === "sell" ? "primary" : "default"}
              onClick={() => handleSelection("buyOrSell", "sell")}
            />
            <Typography variant='subtitle1'>
              Is it a Moving stop or Closing stop?
            </Typography>
            <Controls.Button
              text='Moving'
              color={
                values.movingOrClosing === "moving" ? "primary" : "default"
              }
              onClick={() => handleSelection("movingOrClosing", "moving")}
            />
            <Controls.Button
              text='Closing'
              color={
                values.movingOrClosing === "closing" ? "primary" : "default"
              }
              onClick={() => handleSelection("movingOrClosing", "closing")}
            />

            <Controls.Select
              name='instrument'
              label='instrument'
              value={values.instrument}
              onChange={handleInputChange}
              error={errors.instrument}
              options={instrumentOptions}
            />
            <Controls.Input
              name='recReason'
              label='Recommendation Reason'
              value={values.recReason}
              onChange={handleInputChange}
              error={errors.recReason}
            />
          </Grid>
          <Grid item sm={6}>
            <Controls.Input
              name='tradePrice'
              label='Trade Price'
              value={values.tradePrice}
              onChange={handleInputChange}
              error={errors.tradePrice}
              type='number'
            />
            <Controls.Input
              name='stopLoss'
              label='Stop Loss'
              value={values.stopLoss}
              onChange={handleInputChange}
              error={errors.stopLoss}
              type='number'
            />
            <Controls.Input
              name='target'
              label='Target'
              value={values.target}
              onChange={handleInputChange}
              error={errors.target}
              type='number'
            />
            <Controls.Input
              name='quantity'
              label='Quantity'
              value={values.quantity}
              onChange={handleInputChange}
              error={errors.quantity}
              type='number'
            />
            <Controls.DatePicker
              name='recValidity'
              label='Recommendation Validity'
              value={values.recValidity}
              onChange={handleInputChange}
              minDate={new Date()}
            />
            <Controls.Input
              name='recDisclosure'
              label='Recommendation Disclosure'
              value={values.recDisclosure}
              onChange={handleInputChange}
              error={errors.recDisclosure}
            />

            <div>
              <Controls.Button text='Submit' type='submit' disabled={loading} />
              <Controls.Button
                text='Reset'
                onClick={resetForm}
                color='default'
              />
            </div>
          </Grid>
        </Grid>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </Paper>
  );
}
