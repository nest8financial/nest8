import { useParams} from "react-router-dom";
import '../../utilities/utilities.js'
import { getMonthName } from "../../utilities/utilities.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Checkbox, Button, TextField, Box } from "@mui/material";
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
        <Container>Recommendations for {getMonthName(month)} {year} 
        {/* <div>wallaby {JSON.stringify(singleMonthMetrics)}</div> */}
            {/* <Button type="button"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEditButton}></Button> */}
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