import * as fs from "fs";
import path from "node:path";
import createHttpError from "http-errors";

import { OAuth2Client } from "google-auth-library";

const CONFIG = JSON.parse(
  fs.readFileSync(path.resolve("src", "google-oauth.json"), {
    encoding: "utf-8",
  })
);

const googleOAuthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_SECRET_ID,
  redirectUri: CONFIG.web.redirect_uris[0],
});

export function generateAuthUrl() {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
}

export async function validateCode(code) {
  const response = await googleOAuthClient.getToken(code);

  if (typeof response.tokens.id_token === "undefined") {
    throw createHttpError(401, "Unathorized");
  }

  return googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
}
