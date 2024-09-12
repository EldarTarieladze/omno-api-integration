import express from "express";
import { ApiError } from "../middleware/error-handler.js";

const router = express.Router();

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Handle incoming webhooks from Omno API
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       500:
 *         description: Server error
 */
router.post("/webhook", (req, res, next) => {
  // It was not clear to me how the 3DS Redirection in the task should work.
  try {
    if (!req.body["3dsRedirectUrl"])
      throw new ApiError(400, "Bad Request: Missing 3dsRedirectUrl");

    const redirectUrl = req.body["3dsRedirectUrl"];

    console.info("webhook received", { body: req.body });

    return res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
});

export default router;
