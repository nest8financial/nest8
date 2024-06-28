import { useParams} from "react-router-dom";
import { getMonthName } from "../../utilities/utilities.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import RecommendationActionItem from "../RecommendationActionItem/RecommendationActionItem.jsx";

/**
 * Recommendtaion detail component
 *      - shows recommendations for current month/year
 *      - shows completed checkbox for each recommendation
 *      - shows notes field for each recommendation
 */
function RecommendationDetail() {

    const { year, month } = useParams();
    const dispatch = useDispatch();
    const singleMonthMetrics = 
        useSelector(store => store.financialMetrics.singleMonthMetrics);

    useEffect(() => {
        console.log('dispatchyear, mo', year, month)
        updateSingleMonthMetrics();
    },[])

    const updateSingleMonthMetrics = () =>{
        console.log('dispatchyear, mo', year, month)
        dispatch({
            type: 'GET_SINGLE_MONTH_METRICS',
            payload: { year, month }
        })
    }

    return (
        <Container>
            <Typography style={{ paddingTop: '20px',
                                 display: 'flex',
                                 flexDirection: 'column', 
                                 alignItems: 'center'}} 
                                 variant='h1' 
                                 fontSize={32}> Recommendation Action Items for {getMonthName(month)} {year} </Typography>
            <Typography variant="h7" 
                        textAlign="center"
                        sx={{ px: 15, 
                              fontStyle: "italic", 
                              fontWeight: 'normal',
                         }}>Review and check off action items for each month. Keep track of details in the notes!</Typography>
            {singleMonthMetrics.map(metric => (
                <RecommendationActionItem key={metric.id}
                                          metric={metric}
                                          month={month}
                                          year={year}/>
                )
            )}
        </Container>
    )
}

export default RecommendationDetail;