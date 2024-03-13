import { Subscriber } from "../../models/Subscriber.js";
import jsonwebtoken from "jsonwebtoken";

export const newsletterService = {
  async emailverified(token) {
    try {
      const decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_EMAILVERIFY,
      );
      const email = decodedToken.email;
      await Subscriber.update(
        { verifiedEmail: true },
        {
          where: {
            email,
          },
          returning: true,
          plain: true,
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  },
};
