# lcr-web

LCR Player Website

## Installation

This app uses Docker. You can also run the components individually if you want

To start:

1. Create a file in the backend folder called `backend.private.env`. Copy the commented out fields from `backend.default.env` into this, for the required app secrets
2. For production mode, run `docker-compose up`
3. For development mode run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`. This will watch your source folders and rebuild if code changes

## Where is the code!?

- Server-side app lives in the `backend` folder
- Public front-end app code lives in the `player` folder
- Private admin panel code lives in the `admin` folder
- Code shared between containers lives in the `common` folder (this includes interfaces & the GraphQL schemas)
- Config file for the nginx reverse proxy lives in `proxy`

