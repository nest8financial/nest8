-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE IF EXISTS "monthly_data" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "monthly_inputs" CASCADE;
DROP TABLE IF EXISTS "metrics" CASCADE;
DROP TABLE IF EXISTS "monthly_metrics" CASCADE;
DROP TABLE IF EXISTS "industry" CASCADE;
DROP TABLE IF EXISTS "product" CASCADE;


CREATE TABLE "product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "description" VARCHAR
    "price" DECIMAL,
    "promo_price" DECIMAL
);

CREATE TABLE "industry" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR, 
    "profit_margin" DECIMAL, 
    "asset_turnover_ratio" DECIMAL, 
    "financial_leverage_ratio" DECIMAL,
    "return_on_equity" DECIMAL, 
    "tax_burden" DECIMAL,
    "interest_burden" DECIMAL 
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL, 
    "company" VARCHAR NOT NULL, 
    "industry_id" int REFERENCES "industry" ON DELETE CASCADE,
    "product_id" int REFERENCES "product" ON DELETE CASCADE,
    "date_joined" TIMESTAMP
);

CREATE TABLE "monthly_inputs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int REFERENCES "user" ON DELETE CASCADE,
    "year" INTEGER,
    "month" INTEGER,
    "net_income" DECIMAL, 
    "sales" DECIMAL, 
    "assets" DECIMAL, 
    "equity" DECIMAL, 
    "tax_rate"DECIMAL,
    "earnings_before_tax" DECIMAL
);




CREATE TABLE "metrics" (
    "id" SERIAL PRIMARY KEY,
    "metric_name" VARCHAR,
    "metric_description" VARCHAR,
    "positive_text" VARCHAR,
    "negative_text" VARCHAR
);

CREATE TABLE "monthly_metrics" (
    "id" SERIAL PRIMARY KEY,
    "monthly_id" int REFERENCES "monthly_inputs" ON DELETE CASCADE,
    "metrics_id" int REFERENCES "metrics" ON DELETE CASCADE,
    "metric_value" DECIMAL, 
    "variance_value" DECIMAL, 
    "completed_date" TIMESTAMP, 
    "notes" VARCHAR,
    "recommendation_ai_enhanced" VARCHAR
);

INSERT INTO product
	(id, name, description, price, promo_price)
	VALUES ( 1, 'One-Time Report', '', 50, 0),
		   ( 2, 'Monthly', '/month', 25, 0),
		   ( 3, 'One-Time Report', '/year', 240, 0);
           
INSERT INTO industry
    (name, 
    profit_margin, 
    asset_turnover_ratio,
     financial_leverage_ratio,
     return_on_equity,
     tax_burden,
     interest_burden)
    VALUES( 'farmers', 0.2, 1.5, 2.0, 0.3, 0.2, 0.3);

    
INSERT INTO metrics 
    (metric_name, metric_description, positive_text, negative_text)
    VALUES ('Profit Margin', 'Profit margin is how well your business turns sales into profit.', 'Maintain quality: Ensure that the quality of products or services remains
                high to justify premium pricing and sustain profit margins. Invest in innovation: Allocate resources towards research and development
                to continually improve products or services, enhancing their value
                proposition and justifying higher margins.', 
                'Reduce costs: Identify areas where costs can be reduced without
                compromising quality. This could involve renegotiating contracts with
                suppliers, optimizing inventory management, or streamlining operations'),
            ('Asset Turnover Ratio', 'The asset turnover ratio measures how efficiently a company uses its assets to generate sales', 'Optimize operations: Continuously review and streamline business
                processes to maximize the efficiency of asset utilization. This could involve
                improving inventory management, reducing idle time, or enhancing
                production efficiency. Expand market reach: Explore opportunities to enter new markets or
                expand existing ones to increase sales volume without significantly
                increasing assets.',
                'Improve inventory management: Optimize inventory levels to minimize
                holding costs and reduce the cash tied up in inventory.Increase sales: Implement marketing strategies to attract more customers
                and increase sales volume. Explore opportunities to expand into new
                markets or offer additional products/services.'),
            ('Financial Leverage Ratio', 'Financial leverage ratio is how much debt a company uses to finance its assets.', 'Strategic debt management: If <User> has a lower financial leverage ratio
                compared to industry peers, evaluate the potential benefits of judiciously
                increasing leverage to finance growth initiatives or invest in income-
                generating assets. Balanced capital structure: Maintain a balanced approach to capital
                structure, leveraging debt when advantageous but avoiding excessive risk
                that could jeopardize financial stability.',
                'Reduce debt: If <User> has high debt levels, consider reducing debt
                through debt repayment or restructuring. This can lower interest expenses
                and decrease financial risk. Increase equity financing: Instead of relying heavily on debt financing, seek
                opportunities to raise equity capital through investors or partners. This can
                improve the financial leverage ratio and reduce the reliance on debt.'),
            ('Return on Equity (ROE)', 'Return on Equity (ROE) shows how well a company uses the money invested by its shareholders to make a profit.', 'Capitalize on strengths: Identify the key drivers of superior ROE and double
                down on strategies that have contributed to the business''s success,
                whether it''s operational efficiency, strong brand loyalty, or innovative
                product offerings. Continual improvement: Pursue initiatives aimed at sustaining or enhancing
                ROE over the long term, such as investing in employee training, expanding
                market share, or diversifying revenue streams.',
                'Enhance profitability: Focus on increasing sales, improving profit margins,
                and optimizing asset utilization to boost overall profitability.  Invest in in efficiency: Invest in technologies or processes that enhance
                operational efficiency and productivity, leading to higher returns on equity.'),
            ('Tax Burden', 'Tax burden is the portion of a company''s profits that it must pay in taxes.', 'Tax optimization: Continuously monitor changes in tax regulations and
                work with tax advisors to identify opportunities for tax optimization, such
                as leveraging tax credits or deductions available to businesses with higher
                profitability. Strategic planning: Develop tax planning strategies that align with the
                business''s growth objectives, taking advantage of legal provisions to
                minimize tax liabilities while maximizing after-tax profits.',
                'Tax planning: Work with a tax advisor to identify opportunities for tax
                optimization, such as taking advantage of tax credits, deductions, and
                incentives available to small businesses. Structure optimization: Evaluate <User>''s legal structure to ensure it is tax-
                efficient. Depending on the circumstances, restructuring the business entity
                may help minimize tax liabilities.'),
            ('Interest Burden', 'Interest burden is the cost of borrowing money for a company.', 'Leverage favorable financing: If <User> has a lower interest burden
                compared to industry peers, consider refinancing existing debt at more
                favorable terms to further reduce interest expenses and improve
                profitability. Negotiate with lenders: Use <User>''s strong financial position to negotiate
                better terms with lenders, such as lower interest rates or longer repayment
                periods, to further mitigate interest burden.',
                'Refinance debt: Explore options to refinance existing debt at lower interest
                rates, especially if interest expenses are significantly impacting profitability. Negotiate with lenders: Discuss with lenders to renegotiate loan terms,
                extend repayment periods, or explore alternative financing options to
                reduce interest burden.');










