import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container, Checkbox, Button, TextField, Box } from "@mui/material";

function RecommendationActionItem(metric, month, year) {

    const dispatch = useDispatch();
    const [completedToggleInput, setCompletedToggleInput] = useState(false);
    const [notesInput, setNotesInput] = useState('');

    const handleToggleCompleted = () => {
        dispatch({
            type: 'TOGGLE_METRIC_COMPLETED',
            payload: { month: month,
                        year: year,
                        metricId: metric.id } })
        setCompletedToggleInput(!completedToggleInput);
    }

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

    const handleNotesChange = (event) => {
        const newNotes = event.target.value;
        setNotesInput(newNotes);
    }

    return (
        <Box>
            <Box>{metric.metric_name}
            {metric.variance_value >= 0 ? 
                metric.recommendation_positive_text :
                metric.recommendation_negative_text }
            </Box>
            <Checkbox label="Completed"
                size="large"
                defaultChecked={metric.completed_date !== null ? 
                    true : false }
                value={completedToggleInput}
                onChange={() => handleToggleCompleted(metric.id)}/>
            <Box>
            <TextField
                label="Notes"
                variant="outlined"
                value={notesInput}
                onChange={handleNotesChange}/>
            </Box>
        </Box>
    )
}

export default RecommendationActionItem;






