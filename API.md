# LCR Player API Endpoints

APIs for the LCR Player are split into the following sections:

- /api/public - used by the public frontend and other non-authenticated clients
- /api/private - used by the CMS, authenticated per user
- /api/utility - used by automated clients, using Token authentication

All requests expect/return JSON data unless stated otherwise

## Public

#### GET /api/public/show

Get a list of all shows

#### GET /api/public/show/:slug

Get a show by slug

#### GET /api/public/currentshow

Get the current show & song information

#### GET /api/public/songs/now

Get the current on-air song and Genius data for it 

#### GET /api/public/songs/recent

Get some recently played songs

URL Parameters:

- limit 
- skip

#### GET /api/public/episodetypes

Get the currently available types of episodes

## Utility

Utility requests must be authenticated using a Bearer Token

Tokens can be obtained through the Dashboard

Please add the header `"Authorization" : "Bearer [key]"` with all requests

or use the URL parameter `token=[token]`

#### POST /api/utility/currentshow

Set the current show data that is displayed in the Player

```json
{
    "slug" : "show-slug",
    "title" : "Optional title",
    "description" : "Optional description",
    "image" : "optional url of 16:9 poster imag",
    "disableSongDisplay" : false
}
```

"disableSongDisplay" will hide the song list for the player if set to true.
If title & description are not set, the title and description for the specified show will be used.
All fields are optional. If a valid show slug is provided, data will be filled in from that show to replace blank values.

#### DELETE /api/utility/currentshow

Clear the current show data

#### GET /api/utility/currentshow

Get the current show data

#### POST /api/utility/episode

Add an episode

```json
{
    "metafile" : "url-of-meta-file",
    "type" : "episode-type",
    "publishTime" : "2017-12-05T15:01",
    "title" : "Episode Title",
    "description" : "Episode Description",
    "showSlug" : "slug-of-show-or-null",
    "tags" : "space seperated keywords",
    "image" : "url of 16:9 poster image",
    "length" : 0,
    "public" : true
}
```

Response is the validated entry with an additional uniquely generated parameter "_id"
Specifying the showSlug is not required

#### POST /api/utility/episode/:id

Update an Episode entry. Request format is the same as for inserting a new episode. Note that all fields must be provided.

### Recorder Workflow

When the show starts:

 `POST /api/utility/currentshow` to update the player status

While the show is running:

`GET /api/utility/currentshow` occasionally to make sure the player status hasn't been overwritten
The response for this request will contain additional data for the show (if a valid slug is provided) and current song info

When the show ends:

1. `DELETE /api/utility/currentshow` to clear the current show data
2. Generate meta file & write to web file server
3. `POST /api/utility/episode` to add episode to database


## Private

Internal requests used by the CMS only
