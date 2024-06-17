import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import '../../utilities/utilities.js'
import { getMonthName } from "../../utilities/utilities.js";

/**
 * Recommendtaion detail component
 *      - shows recommendations for current month/year
 *      - shows completed checkbox for each recommendation
 *      - shows notes field for each recommendation
 */
function RecommendationDetail({year, month}) {

    // const { year, month } = useParams();
    const singleMonthMetrics = 
        useSelector(store => store.recommendationsReducer.singleMonthMetrics);

    useEffect(() => {
        dispatch({
            type: 'GET_SINGLE_MONTH_METRICS',
            payload: { year, month }
        })
    })


    return (
        <Container>Recommendations for {getMonthName} {year}
            <Button type="button"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEditButton}></Button>
            {singleMonthMetrics.map(metric => (
                <>
                    <Box>{metric.metric_name}
                        {metric.variance_value >= 0 ? 
                            metric.recommendation_positive_text :
                            metric.recommendation_negative_text }
                    </Box>
                    <Checkbox label="Completed"
                              size="large"
                              defaultChecked={metric.completed_date !== null ? 
                                true : false }/>
                    <Box label="Notes">
                        {metric.notes}
                    </Box>
                </>
            )
            )}

        </Container>
    )
}

export default RecommendationDetail;