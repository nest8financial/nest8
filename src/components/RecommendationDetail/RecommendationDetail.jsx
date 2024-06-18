import { useParams} from "react-router-dom/cjs/react-router-dom.min";
import '../../utilities/utilities.js'
import { getMonthName } from "../../utilities/utilities.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, TextField, Box } from "@mui/material";

/**
 * Recommendtaion detail component
 *      - shows recommendations for current month/year
 *      - shows completed checkbox for each recommendation
 *      - shows notes field for each recommendation
 */
function RecommendationDetail({month, year}) {

    // const { year, month } = useParams();
    const dispatch = useDispatch();
    const singleMonthMetrics = 
        useSelector(store => store.financialMetrics.singleMonthMetrics);
    const [completedCheckboxInput, setCompletedCheckboxInput] = useState(false);
    const [notesInput, setNotesInput] = useState('');

    useEffect(() => {
        console.log('dispatchyear, mo', year, month)
        dispatch({
            type: 'GET_SINGLE_MONTH_METRICS',
            payload: { year, month }
        })
    },[])

    useEffect(() => {
        if (singleMonthMetrics.completed_date) {
            setCompletedCheckboxInput(true);
        } else {
            setCompletedCheckboxInput(false);
        }
        setNotesInput(singleMonthMetrics.notes);
    },[singleMonthMetrics] )

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            console.log(`Debounce timer expired. Updating debounced value:`, notesInput);
            dispatch({
                type: 'UPDATE_METRIC_NOTES',
                payload: { notes: notesInput,
                           metric_id: metric.id,
                           month: month,
                           year: year } })
        }, 500); // Debounce time: 500 milliseconds
 
        return () => {
            console.log('Clearing debounce timer');
            clearTimeout(debounceTimer);
        };
    }, [notesInput]);


    const toggleCompleted = () => {
        dispatch({
            type: 'TOGGLE_METRIC_COMPLETED',
            payload: { month: month,
                       year: year,
                       metricId: metric.id } })
        setCompletedCheckboxInput(!completedCheckboxInput);
    }

    const handleNotesChange = (event) => {
        const newNotes = event.target.value;
        setNotesInput(newNotes);
    }

    return (
        <Container>Recommendations for {getMonthName} {year} 
        <div>wallaby {JSON.stringify(singleMonthMetrics)}</div>

            {/* <Button type="button"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEditButton}></Button> */}
            {/* {singleMonthMetrics.map(metric => (
                <>
                    <Box>{metric.metric_name}
                        {metric.variance_value >= 0 ? 
                            metric.recommendation_positive_text :
                            metric.recommendation_negative_text }
                    </Box>
                    <Checkbox label="Completed"
                              size="large"
                              defaultChecked={metric.completed_date !== null ? 
                                true : false }
                              value={completedCheckboxInput}
                              onChange={toggleCompleted}/>
                    <Box>
                        <TextField
                            label="Notes"
                            variant="outlined"
                            value={notesInput}
                            onChange={handleNotesChange}/>
                    </Box>
                </>
            )
            )} */}

        </Container>
    )
}

export default RecommendationDetail;