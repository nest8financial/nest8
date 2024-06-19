import { useDispatch } from "react-redux";
import { useEffect , useState } from "react";
import { Checkbox, TextField, Box } from "@mui/material";

function RecommendationActionItem({metric, month, year}) {

    const dispatch = useDispatch();
    // const metric = metricObj.metric;
    const [completedToggleInput, setCompletedToggleInput] = 
        useState(false);
    const [notesInput, setNotesInput] = useState(metric.notes);

    useEffect(() => {
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

    const startDebounce = (newNotes)  => {
        const debounceTimer = setTimeout(() => {
            console.log(`Debounce timer expired. Updating debounced value:`, newNotes);
            console.log(`metric id in debounce: ${metric.id}`)
            dispatch({
                type: 'UPDATE_METRIC_NOTES',
                payload: { notes: newNotes,
                           metricId: metric.id,
                           month: month,
                           year: year } })
        }, 800); // Debounce time: 500 milliseconds
        return () => {
            console.log('Clearing debounce timer');
            clearTimeout(debounceTimer);
        };
    }

    const handleNotesChange = (event) => {
        console.log('notes change!');
        const newNotes = event.target.value.trim();
        console.log(`Here are notes:${newNotes}:`);
            setNotesInput(newNotes);
            startDebounce(newNotes);
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






