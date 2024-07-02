const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = 
    require('../modules/authentication-middleware');

/* ------------------------- Utility Functions--------------------------------*/
    //  Get a Short (3-letter) month name from a month number 
    //  How to use: 
    //   console.log(getShortMonthName(2));  
    //   -returns:   "Feb"
    //       (default locale to english US)
    function getShortMonthName(monthNumber, locale = 'en-US') {
        // return blank if no month
        if (monthNumber === '' || monthNumber === 0) {
            return '';
        } 
        monthNumber = Number(monthNumber);
        // Create a Date object for the first day of the given month
        const date = new Date(2000, monthNumber - 1); // Months are 0-based in JavaScript
        // Use Intl.DateTimeFormat to format the month name
        const dateTimeFormat = new Intl.DateTimeFormat(locale, { month: 'short' });
        const parts = dateTimeFormat.formatToParts(date);
        const monthName = parts.find(part => part.type === 'month').value;
        return monthName;
    }
    /**
     * Generate a month array with short month names
     */
    function generateMonthShortNameArray(startMonth, startYear, endMonth, endYear) {
        const monthNameArray = [];
        let currentYear = startYear;
        let currentMonth = startMonth;
        while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {

            monthNameArray.push(getShortMonthName(currentMonth).toUpperCase());
            // Increment month and handle year change
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        }
        return monthNameArray;
    }

    function generateYearMonthArray(startMonth, startYear, endMonth, endYear) {
        const yearMonthArray = [];
        let currentYear = startYear;
        let currentMonth = startMonth;
        while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
            yearMonthArray.push({year: currentYear, month: currentMonth});
            // Increment month and handle year change
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        }
        return yearMonthArray;
    }


/* ------------------------- ROUTES ----------------------------------------*/


/**
 * GET all monthly metrics for a user
 *      - get all data from monthly_metrics table which includes:
 *          6 different computed metrics per month
 *          6 different computed variances per month
 *      - also include metric names and corresponding recommendation texts
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const userId = req.user.id;
        const sqlTextGetMetrics = `
            SELECT monthly_metrics.*, 
                    metrics.metric_name,
                    metrics.positive_text AS recommendation_positive_text,
                    metrics.negative_text AS recommendation_negative_text
                FROM monthly_metrics
                JOIN metrics
                    ON metrics.id = monthly_metrics.metrics_id
                JOIN monthly_inputs
                    ON monthly_metrics.monthly_id = monthly_inputs.id
                WHERE monthly_inputs.user_id = $1
                ORDER BY year, month, id;
            `;
            const dbResponse = await connection.query(sqlTextGetMetrics, [userId]);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * GET a single month's inputs for a user
 *      - get all metrics from monthly_metrics table for a single month,
 *         In the form of 6 entries in the monthly_metrics table that include:
 *          6 different computed metrics 
 *          6 different computed variances 
 *      - also include metric names and corresponding recommendation texts
 */
router.get('/:month&:year', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const userId = req.user.id;
        const sqlTextGetSingleMonth = `
        SELECT monthly_metrics.*, 
               metrics.metric_name,
               metrics.positive_text AS recommendation_positive_text,
               metrics.negative_text AS recommendation_negative_text
            FROM monthly_metrics
                JOIN metrics
                    ON metrics.id = monthly_metrics.metrics_id 
                JOIN monthly_inputs
                    ON monthly_metrics.monthly_id = monthly_inputs.id
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                ORDER BY year, month, id;
            `;
            const dbResponse = await connection.query(sqlTextGetSingleMonth, [userId, month, year]);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        connection.release();
        res.sendStatus(500);
    }
})


/**
 * GET a single month's variances for a user for the summary page
 *      - get all metrics from monthly_metrics table for a single month,
 *         In the form of 6 entries in the monthly_metrics table that include:
 *          6 different computed variances 
 *      - also include metric names 
 */
router.get('/summary/:month&:year', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const userId = req.user.id;
        const sqlTextGetSingleMonth = `
        SELECT monthly_metrics.id,
              monthly_metrics.variance_value,
               metrics.metric_name
            FROM monthly_metrics
                JOIN metrics
                    ON metrics.id = monthly_metrics.metrics_id 
                JOIN monthly_inputs
                    ON monthly_metrics.monthly_id = monthly_inputs.id
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                ORDER BY year, month, id;
            `;
            const dbResponse = await connection.query(sqlTextGetSingleMonth, [userId, month, year]);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        connection.release();
        res.sendStatus(500);
    }
})

/*
 * GET all monthly graph data for a user, used for Financial Progress graph component
 *     Get all data for 6 separate financial progress graphs
 *         - 6 arrays of computed metrics for a month/year range
 *         - 6 arrays of industry metrics for user's industry
 *         - array of short month names for x-axis ticks
 *         - array of metric names, numbers and descriptions 
 */
router.get('/graph_data/:from_month/:to_month/:from_year/:to_year/:metric_id', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const fromMonth = Number(req.params.from_month);
        const toMonth = Number(req.params.to_month);
        const fromYear = Number(req.params.from_year);
        const toYear = Number(req.params.to_year);
        const metricId = Number(req.params.metric_id);
        const userId = req.user.id;

        // create a array with metrics names and descriptions metrics_description
        //      , metrics.metrics_description
        const sqlSelectMetrics = `
            SELECT metrics.id, metrics.metric_name, metric_description
                FROM metrics
                ORDER by metrics.id;
            `;
        const metricsArrayResponse = await connection.query(sqlSelectMetrics);
        const metricsArray = metricsArrayResponse.rows;
        // create a month array that starts at mm/yyyy and ends at mm/yyyy:
        //       - one with just short month names for graph x-axis ticks
        //       - one with year/month number to help populate metric arrays
        //              for graphs for a given date range
        const shortMonthNameArray = generateMonthShortNameArray(fromMonth, fromYear, toMonth, toYear);
        const yearMonthArray = generateYearMonthArray(fromMonth, fromYear, toMonth, toYear);
        // get all industry metrics for the user
        const sqlSelectIndustryMetrics = `
            SELECT    
               name, 
               profit_margin,
               asset_turnover_ratio,
               financial_leverage_ratio,
               return_on_equity,
               tax_burden,
               interest_burden
            FROM industry
            JOIN "user"
                ON "user".industry_id = industry.id
            WHERE "user".id = $1;
        `;
        const dbResponseIndustry = await connection.query(sqlSelectIndustryMetrics, [userId]);
        let industryMetrics = dbResponseIndustry.rows[0];
        // get all metrics for the user
        const sqlSelectUserMetrics = `
            SELECT    
               monthly_metrics.id,
               monthly_inputs.year,
               monthly_inputs.month,
               metrics.id AS metric_id, 
               metrics.metric_description AS metric_description,
               monthly_metrics.metric_value,
               metrics.metric_name
            FROM monthly_metrics
            JOIN metrics
                ON metrics.id = monthly_metrics.metrics_id
            JOIN monthly_inputs
                ON monthly_metrics.monthly_id = monthly_inputs.id
            JOIN "user"
                ON "user".id = monthly_inputs.user_id
            WHERE monthly_inputs.user_id = $1
            ORDER BY year, month, monthly_metrics.id;
        `;
        const dbResponseUserMetrics = await connection.query(sqlSelectUserMetrics, [userId]);
        let monthlyMetricsArray = dbResponseUserMetrics.rows;
        // six user data metric data arrays for graphs:
        let userProfitMargin = [], userAssetTurnoverRatio = [];
        let userFinancialLeverageRatio = [], userReturnOnEquity = [];
        let userTaxBurden = [], userInterestBurden = [];
        // six industry metric data arrays for graphs:
        let industryProfitMargin = [], industryAssetTurnoverRatio = [];
        let industryFinancialLeverageRatio = [], industryReturnOnEquity = [];
        let industryTaxBurden = [], industryInterestBurden = [];
        // Go through the month/year range selected:
        //      for each month/day:
        //          check to see if it exists in monthlyMetricsArray
        //          if it does not exist:
        //              push null to userMetricsArray (for each metric)
        //          if it does exist:
        //              push the metric to userMetricsArray (for each metric)
        //          push the industry metric to the industryMetricsArray (for each metric)
        let metric, oneMonthMetrics;
        for (let {year, month} of yearMonthArray) {
            // reset the metrics for a new date (month/year)
            oneMonthMetrics = [];
            metric = [];
            // check to see if date exists in monthlyMetricsArray
            oneMonthMetrics = 
                monthlyMetricsArray.filter(monthMetric => month === monthMetric.month && year === monthMetric.year);
            // If the month/year DOES NOT exist:
            //    - push null to the userMetricsArray for each metric
            if (oneMonthMetrics.length === 0) {
                userProfitMargin.push(null);
                userAssetTurnoverRatio.push(null);
                userFinancialLeverageRatio.push(null);
                userReturnOnEquity.push(null);
                userTaxBurden.push(null);
                userInterestBurden.push(null);
            // Else if the month/year DOES exist:
            //   - push the metric value to the corresponding metrics
            } else {
                userProfitMargin.push(Number(oneMonthMetrics[0].metric_value));
                userAssetTurnoverRatio.push(Number(oneMonthMetrics[1].metric_value));
                userFinancialLeverageRatio.push(Number(oneMonthMetrics[2].metric_value));
                userReturnOnEquity.push(Number(oneMonthMetrics[3].metric_value));
                userTaxBurden.push(Number(oneMonthMetrics[4].metric_value));
                userInterestBurden.push(Number(oneMonthMetrics[5].metric_value));
            }
            // Then push the industry metrics ot the corresponding metrics
            industryProfitMargin.push(Number(industryMetrics.profit_margin));
            industryAssetTurnoverRatio.push(Number(industryMetrics.asset_turnover_ratio));
            industryFinancialLeverageRatio.push(Number(industryMetrics.financial_leverage_ratio));
            industryReturnOnEquity.push(Number(industryMetrics.return_on_equity));
            industryTaxBurden.push(Number(industryMetrics.tax_burden));
            industryInterestBurden.push(Number(industryMetrics.interest_burden));   
        }
        // Create the graph_data object to send back
        const graph_data =  [ { metric_id: 1,
                                metric_name: metricsArray[0].metric_name,
                                metric_description: metricsArray[0].metric_description,
                                shortMonthNameArray,
                                userMetrics : userProfitMargin,
                                industryMetrics : industryProfitMargin },
                              { metric_id: 2,
                                metric_name: metricsArray[1].metric_name,
                                metric_description: metricsArray[1].metric_description,
                                shortMonthNameArray,
                                userMetrics : userAssetTurnoverRatio,
                                industryMetrics : industryAssetTurnoverRatio },
                              { metric_id: 3,
                                metric_name: metricsArray[2].metric_name,
                                metric_description: metricsArray[2].metric_description,
                                shortMonthNameArray,
                                userMetrics : userFinancialLeverageRatio,
                                industryMetrics : industryFinancialLeverageRatio },
                              { metric_id: 4,
                                metric_name: metricsArray[3].metric_name,
                                metric_description: metricsArray[3].metric_description,
                                shortMonthNameArray,
                                userMetrics : userReturnOnEquity,
                                industryMetrics : industryReturnOnEquity },
                              { metric_id: 5,
                                metric_name: metricsArray[4].metric_name,
                                metric_description: metricsArray[4].metric_description,
                                shortMonthNameArray,
                                userMetrics : userTaxBurden,
                                industryMetrics : industryTaxBurden },
                              { metric_id: 6,
                                metric_name: metricsArray[5].metric_name,
                                metric_description: metricsArray[5].metric_description,
                                shortMonthNameArray,
                                userMetrics : userInterestBurden,
                                industryMetrics : industryInterestBurden } ]

            connection.release();
            res.send(graph_data[metricId - 1]);
    } catch (error) {
            connection.release();
            res.sendStatus(500);
    }
})


/**
 * PATCH - toggle a single metric's completed date 
 */
router.patch('/toggle_completed/:metric_id', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.body.month);
        const year = Number(req.body.year);
        const metricId = Number(req.params.metric_id);
        const userId = req.user.id;

        const sqlTextGetSingleMonth = `
            UPDATE monthly_metrics 
                SET completed_date = 
                    CASE WHEN completed_date IS NULL
                            THEN CURRENT_TIMESTAMP
                         WHEN completed_date IS NOT NULL
                            THEN NULL
                    END
                WHERE monthly_id = (SELECT id 
                                        FROM monthly_inputs
                                        WHERE user_id = $1
                                          AND month = $2
                                          AND year = $3)
                    AND metrics_id = $4;
            `;
            const dbResponse = 
                await connection.query(sqlTextGetSingleMonth, [ userId,
                                                                month, 
                                                                year,
                                                                metricId ]);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * PATCH - update a metric's notes
 */
router.patch('/update_notes/:metric_id', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.body.month);
        const year = Number(req.body.year);
        const metricId = req.params.metric_id;
        const notes = req.body.notes;
        const userId = req.user.id;
        const sqlTextGetSingleMonth = `
            UPDATE monthly_metrics 
                SET notes = $5
                WHERE monthly_id = (SELECT id 
                                        FROM monthly_inputs
                                        WHERE user_id = $1
                                            AND month = $2
                                             AND year = $3)
                    AND metrics_id = $4;
            `;
            const dbResponse =
                 await connection.query(sqlTextGetSingleMonth, [ userId, 
                                                                 month,
                                                                 year, 
                                                                 metricId,
                                                                 notes ]);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        connection.release();
        res.sendStatus(500);
    }
})

 /*------------------------ END ROUTES ---------------------------------------*/


module.exports = router;

