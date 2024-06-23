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
        console.log(`Here's your array from ${startYear} ${startMonth} to ${endYear} ${endMonth}:`, monthNameArray)
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
        console.log(`Here's your array from ${startYear} ${startMonth} to ${endYear} ${endMonth}:`, yearMonthArray)
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
            console.log('Get of monthly metrics in /api/financial_metrics succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of monthly metrics in /api/financial_metrics', error);
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
        console.log('USER: ', req.user);
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const userId = req.user.id;
        console.log('year, month', year, month);
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
            console.log('Get of single month\'s metrics in /api/financial_metrics/:month&:year succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of single month\'s metrics in /api/financial_metrics/:month&:year', error);
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
        console.log('USER: ', req.user);
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const userId = req.user.id;
        console.log('year, month', year, month);
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
            console.log('Get of single month\'s metrics in /api/financial_metrics/summary/:month&:year succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log(
          "Error in get of single month's metrics in /api/financial_metrics/summary/:month&:year",
          error
        );
        connection.release();
        res.sendStatus(500);
    }
})

/**            GRAPHY*****13294545723405234572034572348965 HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * GET all monthly graph data for a user, used for Financial Progress graph component
 *     Get all data for 6 separate financial progress graphs
 *         - 6 arrays of computed variances for a month/year range
 *         - 6 arrays of industry variances for user's industry
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

        console.log('fm, tm, fy, ty, userid', fromMonth, toMonth, fromYear, toYear, userId);
        // create a array with metrics names and descriptions metrics_description
        //      , metrics.metrics_description
        const sqlSelectMetrics = `
            SELECT metrics.id, metrics.metric_name
                FROM metrics
                ORDER by metrics.id;
            `;
        const metricsArrayResponse = await connection.query(sqlSelectMetrics);
        const metricsArray = metricsArrayResponse.rows;
        // create a month array that starts at mm/yyyy and ends at mm/yyyy:
        //       - one with just short month names for graph x-axis ticks
        //       - one with year/month number to help populate variance arrays
        //              for graphs for a given date range
        const shortMonthNameArray = generateMonthShortNameArray(fromMonth, fromYear, toMonth, toYear);
        console.log('shortMonths:', shortMonthNameArray)
        const yearMonthArray = generateYearMonthArray(fromMonth, fromYear, toMonth, toYear);
        console.log('yearmonthArray', yearMonthArray);
        // get all industry variances for the user
        const sqlSelectIndustryVariances = `
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
        const dbResponseIndustry = await connection.query(sqlSelectIndustryVariances, [userId]);
        console.log('Get of monthly graph data in /api/financial_metrics/graph_data succesful:', dbResponseIndustry.rows);
        let industryVariances = dbResponseIndustry.rows[0];
        // get all variances for the user
        const sqlSelectUserVariances = `
            SELECT    
               monthly_metrics.id,
               monthly_inputs.year,
               monthly_inputs.month,
               metrics.id AS metric_id, 
               monthly_metrics.variance_value,
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
        const dbResponseUserVariances = await connection.query(sqlSelectUserVariances, [userId]);
        console.log('Get of monthly graph data in /api/financial_metrics/graph_data succesful');
        let monthlyVariancesArray = dbResponseUserVariances.rows;
        // six user data variance data arrays for graphs:
        let userVarProfitMargin = [], userVarAssetTurnoverRatio = [];
        let userVarFinancialLeverageRatio = [], userVarReturnOnEquity = [];
        let userVarTaxBurden = [], userVarInterestBurden = [];
        // six industry variance data arrays for graphs:
        let industryVarProfitMargin = [], industryVarAssetTurnoverRatio = [];
        let industryVarFinancialLeverageRatio = [], industryVarReturnOnEquity = [];
        let industryVarTaxBurden = [], industryVarInterestBurden = [];
        // Go through the month/year range selected:
        //      for each month/day:
        //          check to see if it exists in monthlyVariancesArray
        //          if it does not exist:
        //              push null to userVariancesArray (for each metric)
        //          if it does exist:
        //              push the variance to userVariancesArray (for each metric)
        //          push the industry variance to the industryVariancesArray (for each metric)
        let variance, oneMonthVariances;
        for (let {year, month} of yearMonthArray) {
            console.log('here:', month, year)
            // reset the variances for a new date (month/year)
            oneMonthVariances = [];
            variance = [];
            // check to see if date exists in monthlyVariancesArray
            oneMonthVariances = 
                monthlyVariancesArray.filter(monthVariance => month === monthVariance.month && year === monthVariance.year);
            console.log('variance:::', oneMonthVariances, '++++++')
            // If the month/year DOES NOT exist:
            //    - push null to the userVariancesArray for each metric
            if (oneMonthVariances.length === 0) {
                userVarProfitMargin.push(null);
                userVarAssetTurnoverRatio.push(null);
                userVarFinancialLeverageRatio.push(null);
                userVarReturnOnEquity.push(null);
                userVarTaxBurden.push(null);
                userVarInterestBurden.push(null);
            // Else if the month/year DOES exist:
            //   - push the variance value to the corresponding metrics
            } else {
                userVarProfitMargin.push(Number(oneMonthVariances[0].variance_value));
                userVarAssetTurnoverRatio.push(Number(oneMonthVariances[1].variance_value));
                userVarFinancialLeverageRatio.push(Number(oneMonthVariances[2].variance_value));
                userVarReturnOnEquity.push(Number(oneMonthVariances[3].variance_value));
                userVarTaxBurden.push(Number(oneMonthVariances[4].variance_value));
                userVarInterestBurden.push(Number(oneMonthVariances[5].variance_value));
            }
            // Then push the industry variances ot the corresponding metrics
            industryVarProfitMargin.push(Number(industryVariances.profit_margin));
            industryVarAssetTurnoverRatio.push(Number(industryVariances.asset_turnover_ratio));
            industryVarFinancialLeverageRatio.push(Number(industryVariances.financial_leverage_ratio));
            industryVarReturnOnEquity.push(Number(industryVariances.return_on_equity));
            industryVarTaxBurden.push(Number(industryVariances.tax_burden));
            industryVarInterestBurden.push(Number(industryVariances.interest_burden));   
        }
        // Create the graph_data object to send back
        const graph_data =  [ { metric_id: 1,
                                metric_name: metricsArray[0].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarProfitMargin,
                                industryVariances : industryVarProfitMargin },
                              { metric_id: 2,
                                metric_name: metricsArray[1].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarAssetTurnoverRatio,
                                industryVariances : industryVarAssetTurnoverRatio },
                              { metric_id: 3,
                                metric_name: metricsArray[2].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarFinancialLeverageRatio,
                                industryVariances : industryVarFinancialLeverageRatio },
                              { metric_id: 4,
                                metric_name: metricsArray[3].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarReturnOnEquity,
                                industryVariances : industryVarReturnOnEquity },
                              { metric_id: 5,
                                metric_name: metricsArray[4].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarTaxBurden,
                                industryVariances : industryVarTaxBurden },
                              { metric_id: 6,
                                metric_name: metricsArray[5].metric_name,
                                shortMonthNameArray,
                                userVariances : userVarInterestBurden,
                                industryVariances : industryVarInterestBurden } ]
            console.log('Get of monthly graph data in /api/financial_metrics/graph_data succesful:', graph_data[metricId - 1] );

            connection.release();
            res.send(graph_data[metricId - 1]);
    } catch (error) {
            console.log('Error in get of monthly graph data in /api/financial_metrics/graph_data', error);
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
        const metricId = req.params.metric_id;
        const userId = req.user.id;
        console.log('year, month', year, month);
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
            console.log('Patch/update of a completed_date (toggle) in /api/financial_metrics/:metricId succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in toggle of completed_date for metric in /api/financial_metrics/:metricId', error);
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
        console.log('year, month, notes, userid, metricId', year, month, '@@@ ', notes, '@@@', userId, metricId);
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
            console.log('Patch/update of notes for a metric in /api/financial_metrics/:metricId succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in toggle of notes for a metric in /api/financial_metrics/:metricId', error);
        connection.release();
        res.sendStatus(500);
    }
})

 /*------------------------ END ROUTES ---------------------------------------*/


module.exports = router;

