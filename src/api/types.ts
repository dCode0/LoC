export interface Album {
    album_type: string
    artists: Artiste[]
    available_markets: string[]
    id: string
    images: Array<{ height: any, width: any, url: string }>
    name: string
    total_tracks: number
    uri: string
    type: string
    href: string
}

export interface Track {
    id: string
    href: string
    name: string
    popularity: number
    uri: string
    available_markets: string[]
    album: Album
    artists: Artiste[]
}

export interface Artiste {
    id: string
    name: string
    type: string
    href: string
}

export interface User {
    country: string;
    display_name: string;
    email: string;
    explicit_content: { filter_enabled: boolean, filter_locked: boolean };
    external_urls: { spotify: string };
    followers: { href: any, total: number };
    href: string;
    id: string;
    images: Array<{ height: any, url: string, width: any }>;
    product: string;
    type: string;
    uri: string;
}

export interface Result {
    albums: any;
    artists: any;
    tracks: any;
}

export interface Playlist {
    id: string;
    images: Array<{ height: any, url: string, width: any }>;
    name: string;
    owner: string;
    uri: string;
    href: string;

}
