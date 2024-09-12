import express from "express";
import { validateTransaction } from "../middleware/validateTransaction.js";
import { createTransaction } from "../services/omnoApi.js";
import { retryOperation } from "../utils/retry-operator.js";
import { ApiError } from "../middleware/error-handler.js";

const router = express.Router();
/**
 * @swagger
 *  /create-transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *               - lang
 *               - hookUrl
 *               - callback
 *               - callbackFail
 *               - billing
 *               - orderId
 *               - cardData
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               lang:
 *                 type: string
 *               hookUrl:
 *                 type: string
 *                 format: uri
 *               callback:
 *                 type: string
 *                 format: uri
 *               callbackFail:
 *                 type: string
 *                 format: uri
 *               billing:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address1:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *               orderId:
 *                 type: string
 *               cardToken:
 *                 type: string
 *               kycVerified:
 *                 type: boolean
 *               previousPaymentCount:
 *                 type: integer
 *               cardData:
 *                 type: object
 *                 properties:
 *                   cardNumber:
 *                     type: string
 *                   cardHolderName:
 *                     type: string
 *                   cardExpiryDate:
 *                     type: string
 *                   cardExpiryDate2:
 *                     type: string
 *                   cardCvv:
 *                     type: string
 *                   browser:
 *                     type: object
 *                     properties:
 *                       colorDepth:
 *                         type: integer
 *                       userAgent:
 *                         type: string
 *                       language:
 *                         type: string
 *                       timeZone:
 *                         type: string
 *                       screenWidth:
 *                         type: integer
 *                       javaEnabled:
 *                         type: boolean
 *                       customerIp:
 *                         type: string
 *                         format: ipv4
 *                       screenHeight:
 *                         type: integer
 *                       windowHeight:
 *                         type: integer
 *                       timeZoneOffset:
 *                         type: integer
 *                       windowWidth:
 *                         type: integer
 *               saveCard:
 *                 type: boolean
 *               merchantInformation:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     maxLength: 22
 *                   merchantName:
 *                     type: string
 *                     maxLength: 22
 *                   country:
 *                     type: string
 *                     minLength: 2
 *                     maxLength: 2
 *                   address1:
 *                     type: string
 *                   administrativeArea:
 *                     type: string
 *                   locality:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   url:
 *                     type: string
 *                     format: uri
 *                   customerServicePhoneNumber:
 *                     type: string
 *                   categoryCode:
 *                     type: string
 *                   noteToBuyer:
 *                     type: string
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/create-transaction",
  validateTransaction,
  async (req, res, next) => {
    try {
      const transactionData = req.body;
      const response = await createTransaction(transactionData);

      res.status(201).json({
        message: "Transaction created successfully",
        response,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      } else {
        next(new ApiError(500, "Error creating transaction", error.stack));
      }
    }
  }
);

export default router;
