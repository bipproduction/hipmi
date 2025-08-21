"use client";

class TokenStorage {
  static value = "";
  static get() {
    return TokenStorage.value;
  }
  static set(value: string) {
    TokenStorage.value = value;
  }
}

type ENV = {
  DATABASE_URL: string;
  WIBU_PWD: string;
  Client_KEY: string;
  Server_KEY: string;
  MAPBOX_TOKEN: string;
  WS_APIKEY: string;
};
export class GlobalEnv {
  static value: ENV | null = null;

  static set(val: ENV) {
    GlobalEnv.value = val;
  }
}

function TokenProvider({
  token,
  envObject,
}: {
  token: string;
  envObject: ENV;
}) {
  TokenStorage.set(token);
  GlobalEnv.set(envObject);
  return null;
}

export { TokenStorage, TokenProvider };
