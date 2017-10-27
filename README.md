# lcr-web
Web components for LCR App

## Installation

Requirements:
node.js & npm
react-scripts
mongodb

### Assisted Installation

1. Run the build.bat file in the root directory
2. Fill in your preferred port number and MongoDB settings into config.json
3. Run "npm start" in a console window to start the server

### Manual Installation

Try this if the build.bat file doesn't work, or if you're not on Windows
(gulp coming soon... maybe)

1. Copy "config.sample.json" into a new file "config.json"
2. Fill in your preferred port number and MongoDB settings into config.json
3. Open a console window in the /dashboard directory to install the React components for the admin pages
4. Run "npm install" and "npm build" in this folder
5. Enter "cd ../web" to go to the public web folder
6. Run "npm install" to set up the public web folder
7. Type "cd .." to go back to the root directory
8. Enter "npm start" to start the server