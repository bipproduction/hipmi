declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string;
    WIBU_PWD?: string;
    Client_KEY?: string;
    Server_KEY?: string;
    MAPBOX_TOKEN?: string;
    WS_APIKEY?: string;
    NEXT_PUBLIC_WIBU_REALTIME_TOKEN?: string;
    NEXT_PUBLIC_BASE_TOKEN_KEY?: string;
    NEXT_PUBLIC_BASE_SESSION_KEY?: string;
    NEXT_PUBLIC_API_URL?: string;
  }
}

