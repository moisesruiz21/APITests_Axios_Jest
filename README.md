# APITests_Axios_Jest
QA Minds API Testing Project

# How to create the framework 
Step 1. Generate a new folder and 
npm --init

Step 2. Install Dependencies and Types and Create Script 
npm install ts-node chai jest axios ts-node
"scripts": {
    "test": "jest"
},
Step 3. Configure TypeScript 
tsc --init

Step 4. Configure Jest 
Create a new file jest.config.ts:
import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/tests/*.test.ts']
};

export default config;

Step 5. Configure Babel 
Create a new file name babel.config.js:
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
};

Step 6. Create Folder Structure 
Data
Env 
Models 
Services 
Tests 
Utils/http

Step 7. Create Env with 3 constansts environment.ts:
export const environment = {
    API_URL: "https://api.trello.com/1",
    TRELLO_API_KEY: "",
    TRELLO_OAUTH_TOKEN: "",
};

Step 8. Create http Class with HTTP Methods 

Step 9. Create Services required with the endpoids, request and response

Step 10. Create Test with Jest structure calling directly the services and creating a JSON with Data
 
Note: Request and Reponse should hace Models to track transactions properly.
