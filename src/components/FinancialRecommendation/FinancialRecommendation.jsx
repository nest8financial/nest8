import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';




function FinancialRecommendation({month,year}){
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
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <br/>
            
        <SnackbarContent message="Recommendations" />
        {recommendations?.map((recommendation) => (
            <SnackbarContent
                key={recommendation.id}
                message={`${recommendation.metric_name} ${recommendation.variance_value >= 0 ? recommendation.recommendation_positive_text : recommendation.recommendation_negative_text}`}
               
                sx={{
                    backgroundColor: recommendation.variance_value >= 0 ? 'green' : 'red',
                    color: 'white'
                }}

                />
        ))}
    </Stack>

);

}


export default FinancialRecommendation;
