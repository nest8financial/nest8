const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = 
    require('../modules/authentication-middleware');



/* ------------------------- ROUTES ----------------------------------------*/


/**
 * GET all monthly inputs for a user
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        userId = user.id;
        const sqlTextGetMetrics = `
            SELECT * 
                FROM monthly_metrics
                WHERE user_id = $1
                ORDER BY year, month;
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
 */
router.get('/:month&:year', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        userId = user.id;
        console.log('year, month', year, month);
        const sqlTextGetSingleMonth = `
            SELECT * 
                FROM monthly_metrics
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                ORDER BY year, month;
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
 * PATCH - toggle a single metric's completed date 
 */
router.patch('/toggle_completed/:metric_id', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        const month = Number(req.body.month);
        const year = Number(req.body.year);
        const metricId = req.params.metric_id;
        userId = user.id;
        console.log('year, month', year, month);
        const sqlTextGetSingleMonth = `
            UPDATE monthly_metrics 
                SET completed_date = 
                    CASE WHEN completed_date IS NULL
                            THEN current_timestamp
                         WHEN completed_date IS NOT NULL
                            THEN NULL
                    END
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                    AND metric_id = $4
                ORDER BY year, month;
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
        userId = user.id;
        console.log('year, month', year, month);
        const sqlTextGetSingleMonth = `
            UPDATE monthly_metrics 
                SET notes = $5
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                    AND metric_id = $4
                ORDER BY year, month;
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

