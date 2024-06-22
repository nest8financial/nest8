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
            monthNameArray.push({getShortMonthName(currentMonth));
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
 *      - get all data from monthly_metrics table which includes:
 *          6 different computed variances per month
 *          industry variances for user's industry
 *      - also include metric names
 */
router.get('/graph_data/:from_month/:to_month/:from_year/:to_year', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const fromMonth = Number(req.params.from_month);
        const toMonth = Number(req.params.to_month);
        const fromYear = Number(req.params.from_year);
        const toYear = Number(req.params.to_year);
        const userId = req.user.id;
        console.log('fm, tm, fy, ty, userid', fromMonth, toMonth, fromYear, toYear, userId);
        // create a month array that starts at mm/yyyy and ends at mm/yyyy
        const monthArray = generateMonthShortNameArray(fromMonth, fromYear, toMonth, toYear);
        console.log('monthArray', monthArray);
        // get all variances for the user
        const sqlSelectVariances = `
            SELECT monthly_inputs.year,
               monthly_metrics.id, 
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
        const dbResponse = await connection.query(sqlSelectVariances, [userId]);
        console.log('Get of monthly graph data in /api/financial_metrics/graph_data succesful:', dbResponse.rows );
        let monthlyVariancesArray = dbResponse.rows;
        // go through the monthly month/day array
        //      for each month/day:
        //          check to see if it exists in monthlyVariancesArray
        //          if it does not exist:
        //              push null to userVariancesArray (for each metric)
        //          if it does exist:
        //              push the variance to userVariancesArray (for each metric)
        //          push the industry variance to the industryVariancesArray (for each metric)
        for (let {month, year} in monthArray) {
            for (let variance of monthlyVariancesArray) {
                if (month = )
            }
        }

        for (let variance of monthlyVariancesArray) {

        }

// 2. get all availble months data from the metric table

// 4. populate a variance table for industry (repeated)
// 5. populate a variace table from the metrics.variance_value column
// 6. grab the metric name we are looking at for the table title
// dispatch getGraphData
//   payload: ( fromYear: fromYear,
//              fromMonth: fromMonth,
//                toYear: toYear,
//              toMonth: toMonth,
//              isDefault: true/false )

  
// { months: [] , industry_variances = [], user_variances = [] }





            console.log('Get of monthly graph data in /api/financial_metrics/graph_data succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
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

