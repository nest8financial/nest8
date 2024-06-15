-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
DROP TABLE IF EXISTS "monthly_data";
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "monthly_inputs" CASCADE;
DROP TABLE IF EXISTS "metrics" CASCADE;
DROP TABLE IF EXISTS "monthly_metrics" CASCADE;
DROP TABLE IF EXISTS "industry" CASCADE;

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
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL, 
    "company" VARCHAR NOT NULL, 
    "industry_id" int REFERENCES "industry" ON DELETE CASCADE 
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
    "earning_before_taxes" DECIMAL
);


CREATE TABLE "metrics" (
    "id" SERIAL PRIMARY KEY,
    "metric_name" VARCHAR,
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
    "notes" VARCHAR 
);












