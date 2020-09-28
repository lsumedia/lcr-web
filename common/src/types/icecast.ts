
export interface IcecastSource {
    audio_info: string
    genre: string
    listenurl: string
    server_description: string
    server_type: string
    server_url: string
    stream_start: string
    stream_start_iso8601: string
    title: string
    dummy: null
}

export interface IcecastIcestats {
    admin: string
    host: string
    location: string
    server_id: string
    server_start_iso8601: string
    source: IcecastSource
}

