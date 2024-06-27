const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { convertToDatesWeHave, generateDatesWeShouldHave, getMissingMonths } = require('../modules/helper-functions-missing-inputs'); 
const { parse } = require('dotenv');

// API Keys 
const OPENAI_API_KEY= process.env.OPENAI_API_KEY;
const openAIurl = 'https://api.openai.com/v1/chat/completions';
const openAIheaders = { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}` };


/*---------- OpenAI helper functions -------___------------------------------ */

/**
 * Helper function for to GET required data from our DB for OpenAI API call 
 */
const getAPIRequestData = async (user_id, month, year) => {
    let connection; // initialize DB connection

    try{
        connection = await pool.connect()
        const sqlText = // GET request to the server to grab the data we will need to send to the AI API in our prompt 
        `
        SELECT monthly_metrics.id, metrics.id AS metric_id,
        metrics.metric_name, industry.name AS industry_name,
	        CASE WHEN monthly_metrics.variance_value >= 0 THEN positive_text
	        		WHEN monthly_metrics.variance_value < 0 THEN negative_text
	        END AS recommendation_text
      FROM monthly_metrics
        JOIN metrics
          ON metrics.id = monthly_metrics.metrics_id
        JOIN monthly_inputs
          ON monthly_metrics.monthly_id = monthly_inputs.id
        JOIN "user"
        	ON monthly_inputs.user_id = "user".id
        JOIN industry
        	ON industry.id = "user".industry_id
        WHERE user_id = $1
          AND month = $2
          AND year = $3
        ORDER BY year, month, metrics_id;
        `
        const recommendation = await connection.query(sqlText, [user_id, month, year]); 

        console.log('recommendation', recommendation.rows)

        const prompt =  // prompt and data to send to the OpenAI API 
        `Look through the following table and provide simplified recommendations based on the recommendations provided, taking into account the corresponding industry and adjusting the recommendation based on if the text is suggesting ways the user can improve or if the user is already meeting industry standards.  
        Use language that the user would understand, based on what industry they work in. For example, use more straightfoward, simple language or analogies for a farmer. For concepts that cannot be simplified, break them down and explain each part. Provide 2 recommendations for each metric and base these recommendations off of the two recommendations provided within the table.
        For your response, respond using JSON format. For each metric, respond with only one description that contains all recommendations. The content response should consist of the metric name and the simplified recommendation text as the description. 
        Content: 
        "profit_margin": "description",
        "asset_turnover_ration": "description",
        "financial_leverage_ratio": "description",
        "return_on_equity": "description", 
        "tax_burden": "description",
        "interest_burden": "description

        Here are the recommendations I would like you to use: 
        Metric ${recommendation.rows[0].metric_id}: ${recommendation.rows[0].metric_name} ${recommendation.rows[0].recommendation_text}
        Metric ${recommendation.rows[1].metric_id}: ${recommendation.rows[1].metric_name} ${recommendation.rows[1].recommendation_text}
        Metric ${recommendation.rows[2].metric_id}: ${recommendation.rows[2].metric_name} ${recommendation.rows[2].recommendation_text}
        Metric ${recommendation.rows[3].metric_id}: ${recommendation.rows[3].metric_name} ${recommendation.rows[3].recommendation_text}
        Metric ${recommendation.rows[4].metric_id}: ${recommendation.rows[4].metric_name} ${recommendation.rows[4].recommendation_text}
        Metric ${recommendation.rows[5].metric_id}: ${recommendation.rows[5].metric_name} ${recommendation.rows[5].recommendation_text}

        Here is the industry to take into acccount for each of these metrics:
        ${recommendation.rows[0].industry_name}
        `;
        const apiRequestData = { // complete request to send to OpenAI
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant receiving financial recommendations and describing them in simple terms to a small business owner.'
            },
            {
              role: 'user',
              content: `${prompt}`
            }
          ],
          max_tokens: 600,
          temperature: 1
        };
      connection.release(); 

      console.log('TESTING API Request Data', apiRequestData);

      return apiRequestData; 
   
    } catch(openAIapiError) {
        console.error(openAIapiError.stack)
        connection.release(); 
        throw new Error ('Error in getAPIRequestData function', openAIapiError);
      }

}

/**
 * Helper function to update DB with OpenAI recommendations
 */

const updateRecommendations = async (parsedData, userId, month, year) => {
    console.log('profit margin?', parsedData.profit_margin);
    console.log('month?', month);
    console.log('user id?', userId);

    let connection; // initialize DB connection

    try {
      connection = await pool.connect()
      const sqlText = // PUT request to update DB with response from OpenAI API
      `
        UPDATE monthly_metrics
        SET recommendation_AI_enhanced = CASE metrics_id
                                        WHEN 1 THEN $1
                                        WHEN 2 THEN $2
                                        WHEN 3 THEN $3
                                        WHEN 4 THEN $4
                                        WHEN 5 THEN $5
                                        WHEN 6 THEN $6
                                    END 
        FROM monthly_inputs 
        WHERE monthly_metrics.monthly_id = monthly_inputs.id   
        AND monthly_inputs.user_id = $7
        AND monthly_inputs.month = $8
        AND monthly_inputs.year = $9;
      `
      const response = 
        await connection.query(sqlText, [parsedData.profit_margin,
                                        parsedData.asset_turnover_ratio,
                                        parsedData.financial_leverage_ratio,
                                        parsedData.return_on_equity, 
                                        parsedData.tax_burden,
                                        parsedData.interest_burden,
                                        userId,
                                        month,
                                        year                            
                                        ]);

                                    
        connection.release();
        return true;
      } catch(dbError) {
        console.error(dbError.stack)
        throw new Error ('Error adding to monthly_metrics table', dbError);
        connection.release();  
      }
  }

/* ------------------------- ROUTES ----------------------------------------*/

/**
 * GET all MISSING monthly inputs for a user
 */

router.get('/missing', rejectUnauthenticated, async (req, res) => {
    let connection;
    connection = await pool.connect();
    try {
        console.log(req.user);
        const userId = req.user.id;
        const sqlTextGetInputs = `
        SELECT 
            "monthly_inputs"."month", 
            "monthly_inputs"."year",
            "user"."date_joined",
            "user"."id" AS user_id   
        FROM "monthly_inputs"
            JOIN "user"
                ON "user"."id" = "monthly_inputs"."user_id"
                WHERE user_id = $1
                ORDER BY year, month;
                `;
            const dbResponse = await connection.query(sqlTextGetInputs, [userId]);
            let arrayOfDatesWeHave = convertToDatesWeHave(dbResponse.rows) // uses helper function to loop through the input dates in the database and creates an array of dates we have 
           
            const joinDate = dbResponse.rows[0].date_joined
            const formattedMonth = joinDate.getMonth() + 1
            const formattedYear = joinDate.getFullYear()
            const formattedJoinDate = [formattedYear, formattedMonth] // formats join date to [Number('YYYY'), Number('MM')] format
         
            let arrayOfDatesWeShouldHave = generateDatesWeShouldHave(formattedJoinDate) // uses helper function to generate an array of arrays with dates from the join date to current date
      
            let missingMonthsResponse = getMissingMonths(arrayOfDatesWeShouldHave, arrayOfDatesWeHave)
            console.log('these are the missing months', missingMonthsResponse);
            connection.release();
            res.send(missingMonthsResponse);
    } catch (error) {
        console.log('Error in get of missing monthly inputs in /api/financial_inputs/missing', error);
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * GET all monthly inputs for a user
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
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
router.get('/:month&:year', rejectUnauthenticated, async (req, res) => {
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
 *             -The Open AI recommendation response 
 *         5. Return created (201) status if successful
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
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
        // To calculate variances:
        //      Because a larger value is better for metric 1, 2, 4:
        //           calculate variance = (user - industry)
        //      Because a smaller value is better for metric 3, 5, 6:
        //           calculate variance = (industry - user)
        const sqlTextInsertMonthlyMetrics = `
                INSERT INTO monthly_metrics
                    (monthly_id, metrics_id, metric_value, variance_value)
                    VALUES 
                    ($1, 1, $2, ($8::DECIMAL - $2::DECIMAL)),      
                    ($1, 2, $3, ($9::DECIMAL - $3::DECIMAL)),      
                    ($1, 3, $4, ($4::DECIMAL - $10::DECIMAL)),     
                    ($1, 4, $5, ($11::DECIMAL - $5::DECIMAL)),     
                    ($1, 5, $6, ($6::DECIMAL - $12::DECIMAL)),    
                    ($1, 6, $7, ($7::DECIMAL - $13::DECIMAL));    
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
        
        const APIRequestData = await getAPIRequestData(userId, month, year) // pulls in the data from the DB to send in our API request to OpenAI
        
        console.log('THIS IS OUR API REQUEST DATA', APIRequestData);

        //  4. make call to openAI assistant with data and prompt
      const AIresponse = await axios({
        method: 'POST',
        url: `${openAIurl}`,
        headers: openAIheaders,
        data: APIRequestData
      });
      
      console.log('Get recommendations back from openAI *****************')
      // 5. Get recommendations response back from openAI

      let aiReccomendations = AIresponse.data.choices[0].message.content
    
      console.log('aiReccomendations*************', aiReccomendations);
      aiReccomendations = aiReccomendations.replace(/^```json\n/, '').replace(/\n```$/, ''); // reformat response 
   
      // Now parse the cleaned JSON string
      const parsedData = JSON.parse(aiReccomendations);
      console.log('parsed data is!', parsedData);

      const updateDB = await updateRecommendations(parsedData, userId, month, year) // function to update the database with the response from OpenAI 

        if (updateDB) {
            // 6. Return created (201) status if successful
            res.sendStatus(201);
        } else {
            throw new Error('Error updating recommendations in DB')
        }

  
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
router.put('/', rejectUnauthenticated, async (req, res) => {
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
           AND month = $10
           AND year = $11
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
                                             earningsBeforeTax,
                                             month,
                                             year ]);
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
        //   To calculate variances:
        //      Because a larger value is better for metric 1, 2, 4:
        //              calculate variance = (user - industry)
        //      Because a smaller value is better for metric 3, 5, 6:
        //              calculate variance = (industry - user)
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
                                        WHEN 3 THEN ($4::DECIMAL - $10::DECIMAL)
                                        WHEN 4 THEN ($11::DECIMAL - $5::DECIMAL)
                                        WHEN 5 THEN ($6::DECIMAL - $12::DECIMAL)
                                        WHEN 6 THEN ($7::DECIMAL - $13::DECIMAL)
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

        const APIRequestData = await getAPIRequestData(userId, month, year) // pulls in the data from the DB to send in our API request to OpenAI
        
        console.log('THIS IS OUR API REQUEST DATA', APIRequestData);

        //  5. make call to openAI assistant with data and prompt
      const AIresponse = await axios({
        method: 'POST',
        url: `${openAIurl}`,
        headers: openAIheaders,
        data: APIRequestData
      });
      
      console.log('Get recommendations back from openAI *****************')
      // 6. Get recommendations response back from openAI

      let aiReccomendations = AIresponse.data.choices[0].message.content
    
      console.log('aiReccomendations*************', aiReccomendations);
      aiReccomendations = aiReccomendations.replace(/^```json\n/, '').replace(/\n```$/, ''); // reformat response 
   
      // Now parse the cleaned JSON string
      const parsedData = JSON.parse(aiReccomendations);
      console.log('parsed data is!', parsedData);

      const updateDB = await updateRecommendations(parsedData, userId, month, year) // function to update the database with the response from OpenAI 

        if (updateDB) {
            // 6. Return created (201) status if successful
            res.sendStatus(201);
        } else {
            throw new Error('Error updating recommendations in DB')
        }

        // 7. Return created (200) status if successful
        res.sendStatus(200);
   } catch (error) {
       console.log('Error in PUT of single month\'s inputs in /api/financial_inputs/', error);
       connection.query('ROLLBACK;');
       connection.release();
       res.sendStatus(500);
   }
})



 /*------------------------ END ROUTES ---------------------------------------*/


module.exports = router;

