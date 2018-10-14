# lcr-web
Web components for LCR App

## Installation

Requirements:
node.js & npm
react-scripts
mongodb
pm2 (recommended)

### Steps

1. Run `npm run build`
2. Copy `config.sample.json` into a new file `config.json` and fill in your settings
3. Run `npm start` to start the server

### Development

Once you've installed all the dependencies, you can run the server in dev mode by 

`npm start` to start running the backend

`npm start:dashboard` and/or `npm start:player` to run the frontend sites in development mode; they will start their own development servers and 

### Updating

Execute update.sh to perform the following:

1. Pull latest commit off GitHub
2. Update any dependencies
3. Rebuild React apps in /dashboard and /player

After updating, run "pm2 restart lcr" to restart the server

### Creating user profiles

A script is provided to make initial user accounts in order to log into the system.

This can be done by executing `npm run newuser`. It will prompt you for a username and password
and, assuming the database is correctly configured, will create a new user.

