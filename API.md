# LCR Player API Endpoints

APIs for the LCR Player are split into the following sections:

- /api/public - used by the public frontend and other non-authenticated clients
- /api/private - used by the CMS, authenticated per user
- /api/utility - used by automated clients, using Token authentication

All requests expect/return JSON data unless stated otherwise

### Public

#### GET /api/public/show

Get a list of all shows

#### GET /api/public/show/:slug

Get a show by slug

#### GET /api/public/songs/now

Get the current on-air song and Genius data for it

### GET /api/public/songs/recent

Get some recently played songs

URL Parameters:

- limit 
- skip

## Private

Internal requests used by the CMS only

## Utility

Utility requests must be authenticated using a Bearer Token

Tokens can be obtained through the Dashboard

Please add the header `"Authorization" : "Bearer [key]"` with all requests

or use the URL parameter `token=[token]`

#### POST /api/utility/recording

```json
{
    "slug" : "show-slug",
    "description" : "A short description of the episode",
    "manifest" : "https://host/folder/Xd6ajds.json"
}
```
