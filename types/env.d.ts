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
    RESEND_APIKEY?: string;
    WA_SERVER_TOKEN?: string;
    FIREBASE_ADMIN_PRIVATE_KEY?: string;
    FIREBASE_ADMIN_CLIENT_EMAIL?: string;
    FIREBASE_ADMIN_PROJECT_ID?: string;
    NEXT_PUBLIC_API_URL?: string;
  }
}
