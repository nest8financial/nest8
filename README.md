
![Repo Size](https://img.shields.io/github/languages/code-size/nest8financial/nest8.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/nest8financial/nest8.svg?style=for-the-badge)

# Nest8 - Prime Academy Group Project 

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)

## Description

Nest8 is a web application for small businesses and start-ups to better track, understand, and optimize their financial health and literacy.

Users create a profile, selecting the industry that best applies to their business. Users enter financial data relevant to their business. The application reviews and calculates the financial health of the business based on industry specific standards. Users are provided with recommendations to improve areas of their business and can track progress through changes made. 

## Built With 


<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
<a href="https://www.openai.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" height="40px" width="40px" /></a>


## Getting Started

This project should be able to run in your favorite IDE. We used VS code while building it. 
<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)


### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7.  Create a `.env` file at the root of the project and paste these lines into the file:

   - SERVER_SESSION_SECRET=`{place string here}`
   - OPENAI_API_KEY=`{place API key here}`

    Add a string like `25POUbVtx6RKVNWszd9ERB9Bb6` to the Server Sessions Secret to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it blank, you will get a warning.

    You will need to create your own Open AI account to generate an OpenAI API key. 

8. Create a database named `nest_8` in PostgresSQL
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
10. Run `npm run server` in your VS Code terminal
11. Open a second terminal and run `npm run client`


## Usage

Once everything is installed and running, navigate to http://localhost:5173/#/

Video walkthrough of application usage: ***** INSERT YOUTUBE VIDEO LINK HERE ******** 



------- DELETE AFTER DEPLOYMENT ----------

## Deployment 

- If you need make changes you wish to push to the deployed app, you must login, go into the nest8prime app, go to the deploy tab, and then manually deploy. You can reconfigure this to redeploy automatically if you wish, which is on the same page.
- Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button
- To set up the DB, we used Postico, just plug the information from Heroku into a new favorite. The information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials. 




