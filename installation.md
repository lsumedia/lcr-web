# Recommended Installation Guide
## for Ubuntu Server 16.04

### Install git, nodejs & mongodb

If git isn't already installed, get it with APT

`sudo apt install git`

And nodejs + npm

`sudo apt install nodejs npm`

Install mongodb - [this guide explains the process well](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/)


### Install PM2

Install PM2 from npm

`sudo npm intall -g pm2`

Add pm2 to startup applications

`pm2 startup systemd`

### Clone deployment branch

Move to the /var/www directory

`cd /var/www`

Clone the deployment branch

`git clone https://github.com/lsumedia/lcr-web.git -b deploy`

Move into the new folder 

`cd lcr-web`

### Configure server

Run the installation script

`. install.sh`

Edit the configuration file (fill in ALL fields)

`nano config.json`

Start the server

`pm2 start server.js --name lcr-web`

Save PM2 config to start server on reboot

`pm2 save`

And you're running!

## Maintenance

### Updating the server

Run the update script to pull changes and install dependencies

`. update.sh`

Restart the server

`pm2 restart lcr-web`


### Checking server status

To see general server status

`pm2 list` or `pm2 show lcr-web`

To see logs

`pm2 logs lcr-web`