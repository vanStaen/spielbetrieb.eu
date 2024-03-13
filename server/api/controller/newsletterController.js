import { Router } from "express";
import { newsletterService } from "../service/newsletterService.js";
const router = Router();

// Email is verified?
router.post("/subscriberverified", async (req, res) => {
  try {
    const token = req.body.token;
    const emailIsVerified = await newsletterService.emailverified(token);
    if (emailIsVerified) {
      res.status(200).json({
        emailVerified: emailIsVerified,
      });
    } else {
      res.status(200).json({
        emailVerified: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export { router };
