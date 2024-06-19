const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = 
    require('../modules/authentication-middleware');



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
 * GET a single month's inputs for a user
 *      - get all metrics from monthly_metrics table for a single month,
 *         In the form of 6 entries in the monthly_metrics table that include:
 *          6 different computed metrics 
 *          6 different computed variances 
 *      - also include metric names and corresponding recommendation texts
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

