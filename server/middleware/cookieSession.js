import cookieSession from "cookie-session";
import {} from "dotenv/config";

export default cookieSession({
  name: "session",
  keys: [
    process.env.COOKIE_KEY_1,
    process.env.COOKIE_KEY_2,
    process.env.COOKIE_KEY_3,
  ],
  cookie: {
    secure: true, // true for https only
    maxAge: 604800000, // 7day x 24h x 60min x 60sec x 1000ms
  },
});
