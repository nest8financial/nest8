const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { convertToDatesWeHave, generateDatesWeShouldHave } = require('../modules/helper-functions-missing-inputs'); 

/* ------------------------- ROUTES ----------------------------------------*/

/**  ****  rejectUnauthenticated, put this in when login done */

/**
 * GET all MISSING monthly inputs for a user
 */

router.get('/missing',  async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {

        const userId = req.user.id;
        const sqlTextGetInputs = `
            SELECT 
                monthly_inputs.month, 
                monthly_inputs.year,
                user.date_joined   
            FROM monthly_inputs
            JOIN user
                ON users.id = monthly_inputs.user_id
                WHERE user_id = $1
                ORDER BY year, month;
            `;
            const dbResponse = await connection.query(sqlTextGetInputs, [userId]);
            let arrayOfDatesWeHave = convertToDatesWeHave(dbResponse.rows)
            console.log('this is the array of arrays we have', arrayOfDatesWeHave);
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of missing monthly inputs in /api/financial_inputs/missing', error);
        connection.release();
        res.sendStatus(500);
    }
})



/**
 * GET all monthly inputs for a user
 */
router.get('/',  async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {

        const userId = req.user.id;
        const sqlTextGetInputs = `
            SELECT * 
                FROM monthly_inputs
                WHERE user_id = $1
                ORDER BY year, month;
            `;
            const dbResponse = await connection.query(sqlTextGetInputs, [userId]);
            console.log('Get of monthly inputs in /api/financial_inputs succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of monthly inputs in /api/financial_inputs', error);
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * GET a single month's inputs for a user
 */
router.get('/:month&:year',  async (req, res) => {
    let connection;
    console.log('requser',req.user);
    connection = await pool.connect();
    try {
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const userId = req.user.id;
        console.log('year, month, user', year, month, userId);
        const sqlTextGetSingleMonth = `
            SELECT * 
                FROM monthly_inputs
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                ORDER BY year, month;
            `;
            const dbResponse = await connection.query(sqlTextGetSingleMonth, [userId, month, year]);
            console.log('Get of single month\'s inputs in /api/financial_inputs/:month&:year succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of single month\'s inputs in /api/financial_inputs/:month&:year', error);
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * POST / ADD a single month's input for a user
 *          (This is a multi-step process)
 * 
 *        For the currently selected year/month:
 *         1. Insert financial inputs into the monthly_inputs table
 *         2. Compute the monthly metrics   
 *         3. Retreive the current industry standard metrics
 *         4. Insert into the monthly_metrics table:
 *             - The newly computed monthly metrics (from 3)
 *             - The computed variances:
 *                  (industry metric - computed monthly metric) or
 *                  (number 3 metric - number 2 metric)
 *         5. Return created (201) status if successful
 */
router.post('/',  async (req, res) => {
    let connection;
    connection = await pool.connect();
   try {
       const month = req.body.month;
       const year = req.body.year;
       const netIncome = req.body.netIncome;
       const sales = req.body.sales;
       const assets = req.body.assets;
       const equity = req.body.equity;
       const taxRate = req.body.taxRate;
       const earningsBeforeTax = req.body.earningsBeforeTax;
       userId = req.user.id;
       // If inserts fail for either monthly_inputs or monthly_metrics,
       //   rollback all SQL changes
       connection.query('BEGIN');

       // 1. Insert financial inputs into the monthly_inputs table
       const sqlTextInsertMonthlyInputs = `
           INSERT INTO monthly_inputs
                (user_id, 
                 year,
                 month,
                 net_income,
                 sales,
                 assets,
                 equity,
                 tax_rate,
                 earnings_before_tax )
                VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )
            RETURNING id;
        `;
        const returnedIdResponse = 
            await connection.query(sqlTextInsertMonthlyInputs,
                                   [userId,
                                    year,
                                    month,
                                    netIncome,
                                    sales,
                                    assets,
                                    equity,
                                    taxRate,
                                    earningsBeforeTax ]);
        console.log('POST of a single month\'s inputs in /api/financial_input/ successful, new id is:',returnedIdResponse.rows[0].id );
        const monthlyInputId = returnedIdResponse.rows[0].id;                       
        // 2. Compute the monthly financial metrics   
        const profitMargin = netIncome / sales;
        const assetTurnoverRatio = sales / assets;  //average assets????
        const financialLeverageRatio = assets / equity;
        const returnOnEquity = profitMargin * assetTurnoverRatio * financialLeverageRatio;
        const taxBurden = netIncome / earningsBeforeTax;
        const interestBurden = earningsBeforeTax / sales;

        // 3. Retreive the industry standard metrics for the current user
        const sqlTextGetIndustry = `
        SELECT profit_margin AS ind_profit_margin,
            asset_turnover_ratio AS ind_asset_turnover_ratio,
            financial_leverage_ratio AS ind_financial_leverage_ratio,
            return_on_equity AS ind_return_on_equity,
            tax_burden AS ind_tax_burden,
            interest_burden AS ind_interest_burden
        FROM industry
        JOIN "user"
            ON industry.id = "user".industry_id
        WHERE "user".id = $1;
        `;
        let industryMetrics = await connection.query(sqlTextGetIndustry, [userId]);
        console.log('Industry metrics retreived successfully in /api/monthly_metrics (POST):', industryMetrics.rows);
        // save industry metrics 
        //   -use them to compute variances in below query
        const indProfitMargin = Number(industryMetrics.rows[0].ind_profit_margin);
        const indAssetTurnoverRatio = Number(industryMetrics.rows[0].ind_asset_turnover_ratio);
        const indFinancialLeverageRatio = Number(industryMetrics.rows[0].ind_financial_leverage_ratio);
        const indReturnOnEquity = Number(industryMetrics.rows[0].ind_return_on_equity);
        const indTaxBurden = Number(industryMetrics.rows[0].ind_tax_burden);
        const indInterestBurden = Number(industryMetrics.rows[0].ind_interest_burden);
        console.log(profitMargin, assetTurnoverRatio, financialLeverageRatio, returnOnEquity, taxBurden, interestBurden, indProfitMargin, indAssetTurnoverRatio, indFinancialLeverageRatio, indReturnOnEquity, indTaxBurden, indInterestBurden, '***********');
        const sqlTextInsertMonthlyMetrics = `
                INSERT INTO monthly_metrics
                    (monthly_id, metrics_id, metric_value, variance_value)
                    VALUES 
                    ($1, 1, $2, ($8::DECIMAL - $2::DECIMAL)),      
                    ($1, 2, $3, ($9::DECIMAL - $3::DECIMAL)),      
                    ($1, 3, $4, ($10::DECIMAL - $4::DECIMAL)),     
                    ($1, 4, $5, ($11::DECIMAL - $5::DECIMAL)),     
                    ($1, 5, $6, ($12::DECIMAL - $6::DECIMAL)),    
                    ($1, 6, $7, ($13::DECIMAL - $7::DECIMAL));    
        `;
        await connection.query(sqlTextInsertMonthlyMetrics,
                                        [ monthlyInputId,
                                          profitMargin,
                                          assetTurnoverRatio,
                                          financialLeverageRatio,
                                          returnOnEquity,
                                          taxBurden,
                                          interestBurden,
                                          indProfitMargin,
                                          indAssetTurnoverRatio,
                                          indFinancialLeverageRatio,
                                          indReturnOnEquity,
                                          indTaxBurden,
                                          indInterestBurden ]);   
        console.log('POST of a single month\'s metrics in /api/financial_input/ successful');  
        connection.query('COMMIT;');
        connection.release();
        // 5. Return created (201) status if successful
        res.sendStatus(201);
   } catch (error) {
       console.log('Error in POST of single month\'s inputs in /api/financial_inputs/', error);
       connection.query('ROLLBACK;');
       connection.release();
       res.sendStatus(500);
   }
})

/**
 * PUT / UPDATE a single month's inputs for a user
 *  *          (This is a multi-step process)
 * 
 *        For the currently selected year/month:
 *         1. Update financial inputs into the monthly_inputs table
 *         2. Re-compute the monthly metrics   
 *         3. Retreive the current industry standard metrics
 *         4. Update the monthly_metrics table:
 *             - The newly computed monthly metrics (from 3)
 *             - The computed variances:
 *                  (industry metric - computed monthly metric) or
 *                  (number 3 metric - number 2 metric)
 *         5. Return 200 status if successful
 */
router.put('/',  async (req, res) => {

    let connection;
    connection = await pool.connect();
   try {
       const month = req.body.month;
       const year = req.body.year;
       const netIncome = req.body.netIncome;
       const sales = req.body.sales;
       const assets = req.body.assets;
       const equity = req.body.equity;
       const taxRate = req.body.taxRate;
       const earningsBeforeTax = req.body.earningsBeforeTax;
       const userId = req.user.id;

       // If inserts fail for either monthly_inputs or monthly_metrics,
       //   rollback all SQL changes
       connection.query('BEGIN');

       // 1. Update financial inputs into the monthly_inputs table
       const sqlTextUpdateMonthlyInputs = `
       UPDATE monthly_inputs
           SET year = $2,
               month = $3,
               net_income = $4,
               sales = $5,
               assets = $6,
               equity = $7,
               tax_rate = $8,
               earnings_before_tax = $9
           WHERE user_id = $1
           RETURNING id;
       `;
       const returnedId = 
            await connection.query(sqlTextUpdateMonthlyInputs, [userId,
                                             year,
                                             month,
                                             netIncome,
                                             sales,
                                             assets,
                                             equity,
                                             taxRate,
                                             earningsBeforeTax ]);
        console.log('PUT of a single month\'s inputs in /api/financial_input/ successful, new id is:',returnedId.rows[0].id );
        const monthlyInputId = returnedId.rows[0].id;                       
        // 2. Compute the monthly financial metrics   
        const profitMargin = netIncome / sales;
        const assetTurnoverRatio = sales / assets;  //average assets????
        const financialLeverageRatio = assets / equity;
        const returnOnEquity = profitMargin * assetTurnoverRatio * financialLeverageRatio;
        const taxBurden = netIncome / earningsBeforeTax;
        const interestBurden = earningsBeforeTax / sales;

        // 3. Retreive the industry standard metrics for the current user
        const sqlTextGetIndustry = `
        SELECT profit_margin AS ind_profit_margin,
            asset_turnover_ratio AS ind_asset_turnover_ratio,
            financial_leverage_ratio AS ind_financial_leverage_ratio,
            return_on_equity AS ind_return_on_equity,
            tax_burden AS ind_tax_burden,
            interest_burden AS ind_interest_burden
        FROM industry
        JOIN "user"
            ON industry.id = "user".industry_id
        WHERE "user".id = $1;
        `;
        let industryMetrics = await connection.query(sqlTextGetIndustry, [userId]);
        console.log('Industry metrics retreived successfully in /api/monthly_metrics (POST):', industryMetrics.rows);
        // save industry metrics 
        //   -use them to compute variances in below query
        const indProfitMargin = Number(industryMetrics.rows[0].ind_profit_margin);
        const indAssetTurnoverRatio = Number(industryMetrics.rows[0].ind_asset_turnover_ratio);
        const indFinancialLeverageRatio = Number(industryMetrics.rows[0].ind_financial_leverage_ratio);
        const indReturnOnEquity = Number(industryMetrics.rows[0].ind_return_on_equity);
        const indTaxBurden = Number(industryMetrics.rows[0].ind_tax_burden);
        const indInterestBurden = Number(industryMetrics.rows[0].ind_interest_burden);
        console.log(profitMargin, assetTurnoverRatio, financialLeverageRatio, returnOnEquity, taxBurden, interestBurden, indProfitMargin, indAssetTurnoverRatio, indFinancialLeverageRatio, indReturnOnEquity, indTaxBurden, indInterestBurden, '***********');
        // 4. Update the monthly_metrics table:
        const sqlTextUpdateMonthlyMetrics = `
            UPDATE monthly_metrics
                SET metric_value = CASE metrics_id
                                      WHEN 1 THEN $2::DECIMAL
                                      WHEN 2 THEN $3::DECIMAL
                                      WHEN 3 THEN $4::DECIMAL
                                      WHEN 4 THEN $5::DECIMAL
                                      WHEN 5 THEN $6::DECIMAL
                                      WHEN 6 THEN $7::DECIMAL
                                   END,
                    variance_value = CASE metrics_id
                                        WHEN 1 THEN ($8::DECIMAL - $2::DECIMAL)
                                        WHEN 2 THEN ($9::DECIMAL - $3::DECIMAL)
                                        WHEN 3 THEN ($10::DECIMAL - $4::DECIMAL)
                                        WHEN 4 THEN ($11::DECIMAL - $5::DECIMAL)
                                        WHEN 5 THEN ($12::DECIMAL - $6::DECIMAL)
                                        WHEN 6 THEN ($13::DECIMAL - $7::DECIMAL)
                                     END
                WHERE monthly_id = $1
                  AND metrics_id IN (1, 2, 3, 4, 5, 6);
            `; 
        await connection.query(sqlTextUpdateMonthlyMetrics,
                                        [ monthlyInputId,
                                          profitMargin,
                                          assetTurnoverRatio,
                                          financialLeverageRatio,
                                          returnOnEquity,
                                          taxBurden,
                                          interestBurden,
                                          indProfitMargin,
                                          indAssetTurnoverRatio,
                                          indFinancialLeverageRatio,
                                          indReturnOnEquity,
                                          indTaxBurden,
                                          indInterestBurden ]);    
        console.log('PUT of a single month\'s metrics in /api/financial_input/ successful:',returnedId.rows[0].id );
        connection.query('COMMIT;');
        connection.release();
        // 5. Return created (200) status if successful
        res.sendStatus(200);
   } catch (error) {
       console.log('Error in POST of single month\'s inputs in /api/financial_inputs/', error);
       connection.query('ROLLBACK;');
       connection.release();
       res.sendStatus(500);
   }
})


 /*------------------------ END ROUTES ---------------------------------------*/


module.exports = router;

