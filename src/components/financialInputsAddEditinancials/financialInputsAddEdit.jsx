
import { TextField,
         FormControl, 
         InputLabel, 
         FormHelperText, 
         FormLabel,
         Container,
         InputAdornment,
         Box, 
         Button } from '@mui/material';
import { getMonthName } from '../../utilities/utilities';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

/**
 * This component provides a way for the user to input, edit, and view
 *      their monthly financial inputs.  These inputs provide
 *      informaton to analyze financial health
 *   -  The month and year are the applicable month / year to input/edit/view
 *          and are passed via params
 *   -  The mode is either view or edit and is determined by if a month/year 
 *          already exists in the monthly_data table
 */
function financialInputsAddEdit({month, year}) {

    const dispatch = useDispatch();
    // const { month, year } = useParams();
    const singleMonthInputs = useSelector(store => store.financialInputs.singleMonthInputs);
    const [amountInputs, setAmountInputs] = useState({
        netIncome: '',
        sales: '',
        assets: '',
        equity: '',
        earningsBeforeTax: '' });
    const [taxRateInput, setTaxRateInput] = useState('');

    const [amountErrors, setAmountErrors] = useState({
        netIncome: false,
        sales: false,
        assets: false,
        equity: false,
        earningsBeforeTax: false });
    const [taxRateError, setTaxRateError] = useState(false);
    const [inputMode, setInputMode] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'GET_SINGLE_MONTH_INPUTS',
            payload: { month, year } })
    }, []);

    useEffect(() => {
        // if no inputs for that month, assume input mode
        if (singleMonthInputs?.length === 0) {
            setInputMode(true);
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
        const decimalRegex = /^\d*\.?\d{0,2}$/;
        // validate amount field
        //   if valid data: set the amount input & clear error for field
        if (decimalRegex.test(value)) {

          setAmountInputs({ ...amountInputs, [name]: value });
          setAmountErrors({ ...amountErrors, [name]: false });
        } else {
        //  if invalid data: set the error for this field
          setAmountErrors({ ...amountErrors, [name]: true });
        }
      }

    /**
     * Handles the tax rate percentage change
     *      - validate tax rate to make sure it is a valid percentage
     *      - if no problems with input, set the tax rate and clear any errors
     *      - if problems with input, set error for tax rate
     */
    const handleTaxRateChange = (event) => {
        event.preventDefault();
        const taxValue = event.target.value;
        const decimalUnlimitedRegex = /^\d*\.?\d{0,}$/;
        // if valid percentage (decimal value, non-negative)
        if (decimalUnlimitedRegex.test(taxValue)) {
            setTaxRateInput(taxValue);
            setTaxRateError(false);
        } else {
            setTaxRateError(true);
        }
    }

    /**
     * Submit the Financial Data for the current month to the database
     */
    const handleSubmitFinancialData = (dispatchEvent) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_FINANCIAL_DATA',
            payload: {
                month: month,
                year: year,
                netIncome: amountInputs.netIncome,
                sales: amountInputs.netIncome,
                assets: amountInputs.assets,
                equity: amountInputs.equity,
                earningsBeforeTax: amountInputs.earningsBeforeTax
            }
        })
    }


    return (
        <Container>
            <Box component="form"
                 onSubmit={handleSubmitFinancialData}>
                <FormLabel component="legend">Input Your Financial Data for {getMonthName(month)} {year}:</FormLabel>
                <TextField
                    required
                    label="Net Income (required)"
                    name="netIncome"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={amountInputs.netIncome}
                    onChange={handleAmountChange}
                    variant="outlined"
                    error={amountErrors.netIncome}
                    helperText={amountErrors.netIncome ? "Please enter a valid decimal value with up to two decimal places" : 
                        "Your Net Income is blah blah blah..."}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}>
                </TextField>
                <TextField
                    required              
                    label="Sales (required)"
                    name="sales"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={amountInputs.sales}
                    onChange={handleAmountChange}
                    variant="outlined"
                    error={amountErrors.sales}
                    helperText={amountErrors.sales ? "Please enter a valid decimal value with up to two decimal places" : 
                        "Your Sales is blah blah blah..."}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}>
                </TextField>
                <TextField
                    required 
                    label="Assets (required)"
                    name="assets"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={amountInputs.assets}
                    onChange={handleAmountChange}
                    variant="outlined"
                    error={amountErrors.assets}
                    helperText={amountErrors.assets ? "Please enter a valid decimal value with up to two decimal places" : 
                        "Your Assets are blah blah blah..."}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}>
                </TextField>
                <TextField
                    required 
                    label="Equity (required)"
                    name="equity"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={amountInputs.equity}
                    onChange={handleAmountChange}
                    variant="outlined"
                    error={amountErrors.equity}
                    helperText={amountErrors.equity ? "Please enter a valid decimal value with up to two decimal places" : 
                        "Your Equity is blah blah blah..."}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}>
                </TextField>
                <TextField
                    required 
                    label="Tax Rate (required)"
                    name="taxRate"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={taxRateInput}
                    onChange={handleTaxRateChange}
                    variant="outlined"
                    error={taxRateError}
                    helperText={taxRateError ? "Please enter a percentage with up to two decimal places" : 
                        "Your Tax Rate is the blah blah blah..."}
                    InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}>
                </TextField>
                <TextField
                    required 
                    label="Earnings Before Tax (EBT) (required)"
                    name="earningsBeforeTax"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={amountInputs.earningsBeforeTax}
                    onChange={handleAmountChange}
                    variant="outlined"
                    error={amountErrors.earningsBeforeTax}
                    helperText={amountErrors.earningsBeforeTax ? "Please enter a valid decimal value with up to two decimal places" : 
                        "Your Earnings Before Tax is blah blah blah..."}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}>
                </TextField>
                <FormHelperText id="my-helper-text">Input your basic financial data for this month</FormHelperText>
                <Button type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}>Add</Button>
            </Box>
        </Container>
    )
}

export default financialInputsAddEdit;