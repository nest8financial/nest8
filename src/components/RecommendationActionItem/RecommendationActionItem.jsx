import { useDispatch } from "react-redux";
import { useEffect , useState } from "react";
import { Container, Checkbox, Button, TextField, Box } from "@mui/material";

function RecommendationActionItem({metric, month, year}) {

    console.log('month, year', month, year)
    const dispatch = useDispatch();
    // const metric = metricObj.metric;
    const [completedToggleInput, setCompletedToggleInput] = 
        useState(false);
    const [notesInput, setNotesInput] = useState(metric.notes);
  

    // useEffect(() => {
    //     if (singleMonthMetrics.completed_date) {
    //         setCompletedCheckboxInput(true);
    //     } else {
    //         setCompletedCheckboxInput(false);
    //     }
    //     setNotesInput(metric.notes);
    // },[] )

    useEffect(() => {
        console.log('completed date', metric.completed_date)
        if (metric.completed_date === null) {
            setCompletedToggleInput(false);
        } else {
            setCompletedToggleInput(true);
        }
    },[])

    const handleToggleCompleted = () => {
        dispatch({
            type: 'TOGGLE_METRIC_COMPLETED',
            payload: { month: month,
                        year: year,
                        metricId: metric.id } })
        setCompletedToggleInput(!completedToggleInput);
    }

    // useEffect(() => {
    //     const debounceTimer = setTimeout(() => {
    //         console.log(`Debounce timer expired. Updating debounced value:`, notesInput);
    //         console.log(`metric id in debounce: ${metric.id}`)
    //         dispatch({
    //             type: 'UPDATE_METRIC_NOTES',
    //             payload: { notes: notesInput,
    //                        metric_id: metric.id,
    //                        month: month,
    //                        year: year } })
    //     }, 500); // Debounce time: 500 milliseconds
 
    //     return () => {
    //         console.log('Clearing debounce timer');
    //         clearTimeout(debounceTimer);
    //     };
    // }, [notesInput]);

    const startDebounce = ()  => {
        const debounceTimer = setTimeout(() => {
            console.log(`Debounce timer expired. Updating debounced value:`, notesInput);
            console.log(`metric id in debounce: ${metric.id}`)
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
    }

    const handleNotesChange = (event) => {
        console.log('notes change!');
        const newNotes = event.target.value;
        setNotesInput(newNotes);
        startDebounce();
    }

    return (
        <Box>{JSON.stringify(metric.metric)}
            <Box>{metric.metric_name}
            {metric.variance_value >= 0 ? 
                metric.recommendation_positive_text :
                metric.recommendation_negative_text }
            </Box>
            <Checkbox label="Completed"
                size="large"
                checked={metric.completed_date !== null ? 
                    true : false }
                value={completedToggleInput === null ? '' : completedToggleInput}
                onChange={() => handleToggleCompleted(metric.id)}/>
            <Box>
            <TextField
                label="Notes"
                variant="outlined"
                value={notesInput === null ? '' : notesInput}
                onChange={handleNotesChange}/>
            </Box>
        </Box>
    )
}

export default RecommendationActionItem;






