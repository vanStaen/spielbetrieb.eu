const router = require("express").Router();
const { newsletterService } = require("../service/newsletterService");

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
  4;
});


module.exports = router;