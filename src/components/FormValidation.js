const validateForm = (fieldValues, errors) => {
  let temp = { ...errors };
  if ("productName" in fieldValues)
    temp.productName = fieldValues.productName ? "" : "This field is required";
  if ("expiry" in fieldValues)
    if (
      fieldValues.productName === "options" ||
      fieldValues.productName === "futures"
    ) {
      temp.expiry = fieldValues.expiry ? "" : "This field is required";
    }
  if ("strikePrice" in fieldValues)
    if (fieldValues.productName === "options") {
      temp.strikePrice = fieldValues.strikePrice
        ? ""
        : "This field is required";
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
  return temp;
};
export default validateForm;
