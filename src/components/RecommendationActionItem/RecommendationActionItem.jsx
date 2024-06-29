import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
    Checkbox,
    TextField,
    Box,
    Container,
    Typography,
    Paper,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { red, green } from "@mui/material/colors";

function RecommendationActionItem({ metric, month, year, company }) {
    const dispatch = useDispatch();
    const [completedToggleInput, setCompletedToggleInput] = useState(false);
    const [notesInput, setNotesInput] = useState(metric.notes);

    const positiveParts = metric.recommendation_positive_text.split("*");
    const negativeParts = metric.recommendation_negative_text.split("*");

    const positiveText0 = positiveParts[0]
        ? positiveParts[0].replace("<User>", company)
        : "";
    const positiveText1 = positiveParts[1]
        ? positiveParts[1].replace("<User>", company)
        : "";
    const negativeText0 = negativeParts[0]
        ? negativeParts[0].replace("<User>", company)
        : "";
    const negativeText1 = negativeParts[1]
        ? negativeParts[1].replace("<User>", company)
        : "";

    // const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    //     flexDirection: "column",
    //     variant: "body1",
    //     fontWeight: "normal",
    //     alignItems: "center",
    //     "& .MuiAccordionSummary-content": {
    //         order: 1,
    //     },
    //     "& .MuiAccordionSummary-expandIconWrapper": {
    //         order: 2,
    //         marginTop: theme.spacing(1),
    //     },
    // }));

    useEffect(() => {
        if (metric.completed_date === null) {
            setCompletedToggleInput(false);
        } else {
            setCompletedToggleInput(true);
        }
    }, [metric.completed_date]);

    const handleToggleCompleted = () => {
        dispatch({
            type: "TOGGLE_METRIC_COMPLETED",
            payload: {
                month: month,
                year: year,
                metricId: metric.metrics_id,
            },
        });
        setCompletedToggleInput(!completedToggleInput);
    };

    const startDebounce = (newNotes) => {
        const debounceTimer = setTimeout(() => {
            console.log(`Debounce timer expired. Updating debounced value:`, newNotes);
            console.log(`metric id in debounce: ${metric.id}`);
            dispatch({
                type: "UPDATE_METRIC_NOTES",
                payload: {
                    notes: newNotes,
                    metricId: metric.id,
                    month: month,
                    year: year,
                },
            });
        }, 800); // Debounce time: 500 milliseconds
        return () => {
            console.log("Clearing debounce timer");
            clearTimeout(debounceTimer);
        };
    };

    const handleNotesChange = (event) => {
        console.log("notes change!");
        const newNotes = event.target.value;
        console.log(`Here are notes:${newNotes}:`);
        setNotesInput(newNotes);
        startDebounce(newNotes);
    };

    return (
        <Container>
            {metric.variance_value === null ? '' :
            (
            <Paper elevation={10} sx={{ pt: 2, m: 2, display: "flex", flexDirection: "column" }}>
                <Box>
                    <Box sx={{ pt: 1,
                               display: "flex",
                               justifyContent: "flex-start",
                               backgroundColor: (metric.variance_value >= 0 ?
                                'rgba(226,242,242,100)' : 'rgba(246,195,191,100)') }}>
                        <Typography sx={{ fontSize: "10px", transform: "translate(12px, -5px)" }}>
                            COMPLETE
                        </Typography>
                        <Checkbox
                            label="Completed"
                            size="large"
                            sx={{ ml: -5 }}
                            checked={metric.completed_date !== null ? true : false}
                            value={completedToggleInput === null ? "" : completedToggleInput}
                            onChange={() => handleToggleCompleted(metric.id)}
                        />
                        <Box sx={{ display: "flex", transform: 'translate(10px, 10px)'}}>
                            {metric.variance_value >= 0 ? (
                                <CheckCircleIcon sx={{ color: green[500], mt: 0.5, mx: 1 }} />
                            ) : (
                                <WarningIcon sx={{ color: red[700], mt: 0.5, mx: 1 }} />
                            )}
                            <Typography variant="h6">{metric.metric_name}</Typography>
                        </Box>
                    </Box>
                    {/* <Typography sx={{ mx: 2 }}>
                        {metric.variance_value >= 0
                            ? metric.recommendation_positive_text
                            : metric.recommendation_negative_text}
                    </Typography> */}
                    <Typography variant="body1"
                                fontWeight="normal"
                                sx={{p: 2}}>
                        {metric.variance_value >= 0 ? (
                            <>
                                {positiveText0}
                                <br />
                                <br />
                                {positiveText1}
                            </>
                        ) : (
                            <>
                                {negativeText0}
                                <br />
                                <br />
                                {negativeText1}
                            </>
                        )}
                    </Typography>
                    {metric.recommendation_ai_enhanced &&
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header" >
                                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", mb: 0}}>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "0.875rem", pt: 0, mb: -10}}>
                                        MORE INFO
                                    </Typography>
                                </Box>
                            </AccordionSummary>                      
                        <AccordionDetails variant="body1" sx={{fontWeight: 'normal'}}>{metric.recommendation_ai_enhanced}</AccordionDetails>
                    </Accordion>
                    }
                </Box>
                <Box>
                    <TextField
                        label="Notes"
                        variant="outlined"
                        multiline
                        rows={2}
                        style={{ width: "100%" }}
                        value={notesInput === null ? "" : notesInput}
                        onChange={handleNotesChange}
                    />
                </Box>
            </Paper>
            )}
        </Container>
    );
}

export default RecommendationActionItem;
