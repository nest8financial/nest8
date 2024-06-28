import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Paper,
         Divider, 
         Card, 
         CardContent, 
         CardActions, 
         Typography, 
         Button,
         Box,
         Accordion,
         AccordionDetails,
         AccordionSummary, 
         Container }  from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { red, green } from '@mui/material/colors';          
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMonthName } from '../../utilities/utilities.js'
import { styled } from '@mui/system';

function FinancialRecommendation({month, year, company}){

console.log('month',month);
console.log('year',year);
    const recommendations =  useSelector(store => store.financialMetrics.singleMonthMetrics);
    const dispatch = useDispatch();

    const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiAccordionSummary-content': {
          order: 1,
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          order: 2,
          marginTop: theme.spacing(1),
        },
      }));

    useEffect(() => {
        if (month && year) {

        dispatch({
           type: "GET_SINGLE_MONTH_METRICS",
           payload: {month,year}
        });
        console.log("month",month);
    }

       }, [dispatch, month, year])
        console.log("Recommendations updated:", recommendations);
 

    return(
        <Container>
        <br></br>
        <Divider sx={{ my: 2 }} textAlign="left" >RECOMMENDATIONS</Divider>
        <br></br>
        <Paper elevation={10}>
                <br></br>
                <Typography variant="h5" align="center" sx={{ m: 2 }}>Recommendations for</Typography>
                <Typography variant="h4" align="center">{company}</Typography>
                <Typography variant="h5" align="center" sx={{ m: 2 }}>{getMonthName(month)} {year}</Typography>
                {recommendations.length === 0 ? (
                    <Box>
                        <Typography sx={{ color: 'red', fontStyle: 'italic', textAlign: 'center', p: 2 }} variant="body1">
                            Please provide inputs for this month to see Summary information
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {recommendations.map((recommendation) => {
                            const positiveParts = recommendation.recommendation_positive_text.split('*');
                            const negativeParts = recommendation.recommendation_negative_text.split('*');

                            const positiveText0 = positiveParts[0] ? positiveParts[0].replace('<User>', company) : '';
                            const positiveText1 = positiveParts[1] ? positiveParts[1].replace('<User>', company) : '';
                            const negativeText0 = negativeParts[0] ? negativeParts[0].replace('<User>', company) : '';
                            const negativeText1 = negativeParts[1] ? negativeParts[1].replace('<User>', company) : '';

                            return (
                                <Card key={recommendation.id}
                                    sx={{
                                        m: 1,
                                        backgroundColor: (recommendation.variance_value >= 0 ?
                                            'rgba(226,242,242,100)' : 'rgba(246,195,191,100)')
                                    }}>
                                        <Box sx={{ display: 'flex' }}>
                                            {recommendation.variance_value >= 0 ? 
                                                <CheckCircleIcon sx={{ color: green[500], fontSize: '15px', mt: 1, mx: 1}}/> : 
                                                <WarningIcon sx={{ color: red[700], fontSize: '15px', mt: 1, mr: 1 }} />}  
                                            <Typography variant="h6">  {recommendation.metric_name}</Typography>
                                        </Box>
                                    <Accordion>
                                        <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1-content"
                                                                id="panel1-header">
                                            <Box sx={{ display: 'flex', 
                                                       flexDirection: 'column', 
                                                       textAlign: 'center', 
                                                       mb: -3
                                                }}>
                                                <Typography variant="body1">
                                                        {recommendation.variance_value >= 0 ? (
                                                            <>
                                                                {positiveText0}
                                                                <br /><br />
                                                                {positiveText1}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {negativeText0}
                                                                <br /><br />
                                                                {negativeText1}
                                                            </>
                                                        )}
                                                    </Typography>
                                                    <Typography variant="body1" 
                                                                sx={{ fontWeight: 'bold', fontSize: '0.875rem', pt: 1.5 }}>MORE INFO</Typography>
                                                </Box>
                                        </CustomAccordionSummary>
                                        <AccordionDetails>
                                            {recommendation.recommendation_ai_enhanced}
                                        </AccordionDetails>
                                    </Accordion>
                                </Card>
                            );
                        })}
                    </>
                )}
                <br></br>
            </Paper>
        <br></br>
        </Container>

);

}


export default FinancialRecommendation;
