import {
  TextField,
  Paper,
  FormLabel,
  FormControl,
  Container,
  InputAdornment,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { getMonthName } from "../../utilities/utilities";
import { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import AddSavePopUp from "../AddSavePopUp/AddSavePopUp";

/**
 * This component provides a way for the user to input, edit, and view
 *      their monthly financial inputs.  These inputs provide
 *      informaton to analyze financial health
 *   -  The month and year are the applicable month / year to input/edit/view
 *          and are passed via params
 *   - input/edit/view controlled by two pieces of state
 *        These two pieces of state are set initially:
 *          newInputMonth (true if this is a new month/year for user,
 *                         false if this is an existing month/year)
 *          readOnlyMode (true if this is an existing month/year for user,
 *                        false if this in an existing month/year)
 *      ***** NOTE TAX RATE NOT CURRENTLY USED BUT CODE KEPT IN FOR FUTURE
 *                 FUNCTIONALITY: Tax Rate Input, Validation removed,
 *                                   setting tax rate to 0 in database
 */
function AddEditInputs() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { month, year } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    history.push("/input_header");
  };

  const singleMonthInputs = useSelector(
    (store) => store.financialInputs.singleMonthInputs
  );
  const [amountInputs, setAmountInputs] = useState({
    netIncome: "",
    sales: "",
    assets: "",
    equity: "",
    earningsBeforeTax: "",
  });
  const [taxRateInput, setTaxRateInput] = useState("");
  const [amountErrors, setAmountErrors] = useState({
    netIncome: false,
    sales: false,
    assets: false,
    equity: false,
    earningsBeforeTax: false,
  });
  const [taxRateError, setTaxRateError] = useState(false);
  const [newInputMonth, setNewInputMonth] = useState(false);
  const [readOnlyMode, setReadOnlyMode] = useState(true);
  let inputProperites;

  /**
   * Gets the single month's inputs state from the store
   *      upon component load
   */
  useEffect(() => {
    dispatch({
      type: "GET_SINGLE_MONTH_INPUTS",
      payload: { month, year },
    });
  }, []);

  /**
   * Handles initial load of year/month financial data
   *      - determines if new/existing month
   *      - sets up screen for new/exising month
   *      (This runs when singleMonthInputs state changes)
   */
  useEffect(() => {
    // if this is a new year/month for financial inputs:
    //      - newInputMode is true
    //      - readOnlyMode is false
    if (Object.keys(singleMonthInputs).length === 0) {
      setNewInputMonth(true);
      setReadOnlyMode(false);
      setAmountInputs({
        netIncome: "",
        sales: "",
        assets: "",
        equity: "",
        earningsBeforeTax: "",
      });
      setTaxRateInput("0");
      // else if this is an existing year/month for financial inputs:
      //      - newInputMode is false
      //      - readOnlyMode is true
      //      - load existing year/month data into fields
    } else {
      setNewInputMonth(false);
      setReadOnlyMode(true);
      setAmountInputs({
        netIncome: singleMonthInputs.net_income,
        sales: singleMonthInputs.sales,
        assets: singleMonthInputs.assets,
        equity: singleMonthInputs.equity,
        earningsBeforeTax: singleMonthInputs.earnings_before_tax,
      });
      setTaxRateInput(singleMonthInputs.tax_rate);
    }
  }, [singleMonthInputs]);

  /**
   * Handles any of the amount fields on any input change
   *      - validate input to make sure it is a valid number with
   *          two decimal places
   *      - if no problems with input, set the amounts to the new values
   *          and clear errors for that field
   *      - if problems with input, set error for this field
   */
  const handleAmountChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const decimalRegex = /^-?\d*\.?\d{0,2}$/;
    // validate amount field
    //   if valid data: set the amount input & clear error for field
    if (decimalRegex.test(value)) {
      setAmountInputs({ ...amountInputs, [name]: value });
      setAmountErrors({ ...amountErrors, [name]: false });
    } else {
      //  if invalid data: set the error for this field
      setAmountErrors({ ...amountErrors, [name]: true });
    }
  };

  /**     CURRENTLY NOT USED AS TAX RATE IS NOT USED
   * Handles the tax rate percentage change
   *      - validate tax rate to make sure it is a valid percentage
   *      - if no problems with input, set the tax rate and clear any errors
   *      - if problems with input, set error for tax rate
   */
  // const handleTaxRateChange = (event) => {
  //    event.preventDefault();
  //    const taxValue = event.target.value;
  //    const decimalUnlimitedRegex = /^\d*\.?\d{0,}$/;
  //    // if valid percentage (decimal value, non-negative)
  //    if (decimalUnlimitedRegex.test(taxValue)) {
  //        setTaxRateInput(taxValue);
  //        setTaxRateError(false);
  //    } else {
  //        setTaxRateError(true);
  //    }
  // }

  /**
   * Submit the Financial Data for the current month to the database
   */
  const handleEditSaveButton = (event) => {
    event.preventDefault();
    // if screen is in readOnly mode, button pressed is edit
    //      - Edit button pressed: change to edit mode to allow changes
    if (readOnlyMode) {
      setReadOnlyMode(false);
      // else, if screen is not in readOnly mode, button pressed is save
      //      - Save button pressed: save or update financial inputs
    } else {
      const decimalRegex = /^-?\d*\.?\d{0,2}$/;

      let hasError = false;
      const updatedErrors = { ...amountErrors };

      Object.keys(amountInputs).forEach((key) => {
        if (!decimalRegex.test(amountInputs[key]) || amountInputs[key] === "") {
          updatedErrors[key] = true;
          hasError = true;
        }
      });
      //*** REMOVED VALIDATION FOR TAX RATE AS TAX RATE NOT CURRENTLY USED */
      //  // Validate tax rate input
      //  if (!decimalRegex.test(taxRateInput) || taxRateInput === '') {
      //     setTaxRateError(true);
      //     hasError = true;
      // } else {
      //     setTaxRateError(false);
      // }

      // Update errors state
      setAmountErrors(updatedErrors);

      // Only proceed if there are no errors
      if (!hasError) {
        const payload = {
          month: month,
          year: year,
          netIncome: amountInputs.netIncome,
          sales: amountInputs.sales,
          assets: amountInputs.assets,
          equity: amountInputs.equity,
          taxRate: "0",
          earningsBeforeTax: amountInputs.earningsBeforeTax,
        };

        // if new input month, add financial inputs for year/month
        if (newInputMonth) {
          dispatch({
            type: "ADD_SINGLE_MONTH_INPUTS",
            payload,
          });
          // else existing input month, update financial inputs for year/month
        } else {
          dispatch({
            type: "UPDATE_SINGLE_MONTH_INPUTS",
            payload,
          });
        }
        // clear inputs after add or update
        setAmountInputs({
          netIncome: "",
          sales: "",
          assets: "",
          equity: "",
          earningsBeforeTax: "",
        });
        setTaxRateInput("");
        setAmountErrors({
          netIncome: false,
          sales: false,
          assets: false,
          equity: false,
          earningsBeforeTax: false,
        });
        setTaxRateError(false);
        // kick back to input header screen
        handleSnackbarOpen();
      }
    }
  };

  // **** CURRENTLY NOT USED AS TAX RATE IS NOT USED
  // const handleEditClick = (event) => {
  //     console.log('edit mode')
  //     event.preventDefault();
  //     setInputMode(true);
  // }
  // If inputMode === false,
  //      start fields read only,
  //      display edit button,
  //      don't display save button
  //      fields are loaded with initial data (above)
  //                InputProps={{
  //   readOnly: true,
  //     }}
  return (
    <Container>
      <Box component="form" sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel
            component="legend"
            sx={{
              textAlign: "left",
              mb: 2,
              fontSize: "1.50rem",
              fontWeight: "bold",
            }}
          >
            Input Your Financial Data for {getMonthName(month)} {year}:
          </FormLabel>
          <Stack spacing={4}>
            <Paper elevation={10} sx={{ p: 2 }}>
              <TextField
                required
                label={readOnlyMode ? "Net Income" : "Net Income (required)"}
                name="netIncome"
                type="number"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: readOnlyMode,
                }}
                value={amountInputs.netIncome}
                onChange={handleAmountChange}
                variant={readOnlyMode ? "standard" : "outlined"}
                error={amountErrors.netIncome}
                helperText={
                  amountErrors.netIncome
                    ? "Please enter a valid decimal value with up to two decimal places"
                    : "Net Income is the amount of money you have left after subtracting all expenses from your total earnings. It's the profit that is left after you subtract all costs, taxes, etc."
                }
              />
            </Paper>
            <Paper elevation={10} sx={{ p: 2 }}>
              <TextField
                required
                label={readOnlyMode ? "Sales" : "Sales (required)"}
                name="sales"
                type="number"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: readOnlyMode,
                }}
                value={amountInputs.sales}
                onChange={handleAmountChange}
                variant={readOnlyMode ? "standard" : "outlined"}
                error={amountErrors.sales}
                helperText={
                  amountErrors.sales
                    ? "Please enter a valid decimal value with up to two decimal places"
                    : "Sales is the total amount of money your business earned from selling your products or services before any expenses."
                }
              />
            </Paper>
            <Paper elevation={10} sx={{ p: 2 }}>
              <TextField
                required
                label={readOnlyMode ? "Assets" : "Assets (required)"}
                name="assets"
                type="number"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: readOnlyMode,
                }}
                value={amountInputs.assets}
                onChange={handleAmountChange}
                variant={readOnlyMode ? "standard" : "outlined"}
                error={amountErrors.assets}
                helperText={
                  amountErrors.assets
                    ? "Please enter a valid decimal value with up to two decimal places"
                    : "Assets is the average value of everything your business owns over a month. Assets can include cash, inventory, equipment, property, and any other valuable items."
                }
              />
            </Paper>
            {/* <TextField
               required 
               label={readOnlyMode ? "Tax Rate" : "Tax Rate (required)"}
               name="taxRate"
               type="number"
               inputProps={{ step: "0.01" }}
               InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>,
                             readOnly: readOnlyMode}}
               value={taxRateInput}
               onChange={handleTaxRateChange}
               variant={readOnlyMode ? 'standard' : 'outlined'}
               error={taxRateError}
               helperText={taxRateError ? "Please enter a percentage with up to two decimal places" : 
                   "Your Tax Rate is the blah blah blah..."}>
           </TextField> */}
            <Paper elevation={10} sx={{ p: 2 }}>
              <TextField
                required
                label={readOnlyMode ? "Equity" : "Equity (required)"}
                name="equity"
                type="number"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: readOnlyMode,
                }}
                value={amountInputs.equity}
                onChange={handleAmountChange}
                variant={readOnlyMode ? "standard" : "outlined"}
                error={amountErrors.equity}
                helperText={
                  amountErrors.equity
                    ? "Please enter a valid decimal value with up to two decimal places"
                    : "Equity is the value of what you own in the business after subtracting all your debts and liabilities. If your business sold everything it owned and paid off all its debts, the remaining money would be your equity."
                }
              />
            </Paper>
            <Paper elevation={10} sx={{ p: 2 }}>
              <TextField
                required
                label={
                  readOnlyMode
                    ? "Earnings Before Tax (EBT)"
                    : "Earnings Before Tax (EBT) (required)"
                }
                name="earningsBeforeTax"
                type="number"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: readOnlyMode,
                }}
                value={amountInputs.earningsBeforeTax}
                onChange={handleAmountChange}
                variant={readOnlyMode ? "standard" : "outlined"}
                error={amountErrors.earningsBeforeTax}
                helperText={
                  amountErrors.earningsBeforeTax
                    ? "Please enter a valid decimal value with up to two decimal places"
                    : "Earnings Before Tax is the amount of money your business has left after subtracting all its operating expenses, interest, and other costs, but before paying taxes."
                }
              />
            </Paper>
          </Stack>
          <AddSavePopUp open={snackbarOpen} handleClose={handleSnackbarClose} />
          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, alignSelf: "flex-end" }}
            onClick={(e) => handleEditSaveButton(e)}
          >
            {readOnlyMode ? "Edit" : "Save"}
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}

export default AddEditInputs;
