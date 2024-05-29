import { Router } from "express";
import { friendService } from "../service/friendService.js";
const router = Router();

router.get("/friendspending", async (req, res) => {
  try {
    const pending = await friendService.getFriendsPending(req.userId);
    res.status(200).json({
      pending,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/fremdfriendspending", async (req, res) => {
  try {
    const userId = req.body.userId;
    const pending = await friendService.getFriendsPending(userId);
    res.status(200).json({
      pending,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/friend", async (req, res) => {
  try {
    const userId = req.userId;
    const friendId = req.body.friendId;
    const response = await friendService.addFriendRequest(userId, friendId);
    res.status(200).json({
      success: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/validatefriendrequest", async (req, res) => {
  try {
    const userId = req.userId;
    const friendId = req.body.friendId;
    const validated = await friendService.validateFriendRequest(
      userId,
      friendId,
    );
    res.status(200).json({
      validated,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.delete("/friend", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const userId = req.userId;
    const friendId = req.body.friendId;
    const response = await friendService.deleteFriend(userId, friendId);
    res.status(200).json({
      success: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.delete("/friendrequest", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const userId = req.userId;
    const friendId = req.body.friendId;
    const response = await friendService.cancelFriendRequest(userId, friendId);
    res.status(200).json({
      success: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export { router };
