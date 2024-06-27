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
        Container }  from '@mui/material';
import { getMonthName } from '../../utilities/utilities.js'

function FinancialRecommendation({month, year, company}){

console.log('month',month);
console.log('year',year);
    const recommendations =  useSelector(store => store.financialMetrics.singleMonthMetrics);
    
    const dispatch = useDispatch();


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
            <Typography variant="h5"
                align="center"
                sx={{m: 2}}>Recommendations for</Typography>
                <Typography variant="h4" align="center"> {company}</Typography>
            <Typography variant="h5" align="center" sx={{m: 2}}>{getMonthName(month)} {year}
            </Typography>
            {recommendations.length === 0 ?
                (
                    <Box>
                        <Typography sx={{ color: 'red',
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        p: 2 }}
                                    variant="body1"
                        >Please provide inputs for this month to see Summary information
                        </Typography>
                        </Box>
                ) : (
                    <>
                        {recommendations?.map((recommendation) => (
                        <Card key={recommendation.id}
                            sx={{m: 1,
                                backgroundColor: (recommendation.variance_value >= 0 ? 
                                    'rgba(226,242,242,100)' : 'rgba(246,195,191,100)') }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6">{recommendation.metric_name}</Typography>
                                <Typography variant="body1"
                                >{`${recommendation.variance_value >= 0 ?
                                    recommendation.recommendation_positive_text : 
                                    recommendation.recommendation_negative_text}`}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{mt: -3, mb: -1 }}>
                                <Button fullWidth={true}
                                        size="small"
                                        sx={{ justifyContent: 'left', pl: 2 }} 
                                        >DETAILS</Button>
                            </CardActions>
                        </Card>
                        
                        ))}
                    </>
                )}
                <br></br>
            
        </Paper>
        <br></br>
        </Container>

);

}


export default FinancialRecommendation;
