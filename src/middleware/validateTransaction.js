import Joi from "joi";

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  lang: Joi.string().required(),
  hookUrl: Joi.string().uri().required(),
  callback: Joi.string().uri().required(),
  callbackFail: Joi.string().uri().required(),
  billing: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address1: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    externalUserId: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
  }).required(),
  orderId: Joi.string().required(),
  cardToken: Joi.string().required(),
  payment3dsType: Joi.string().required(),
  kycVerified: Joi.boolean().required(),
  previousPaymentCount: Joi.number().integer().required(),
  cardData: Joi.object({
    cardNumber: Joi.string().required(),
    cardHolderName: Joi.string().required(),
    cardExpiryDate: Joi.string().required(),
    cardExpiryDate2: Joi.string().required(),
    cardCvv: Joi.string().required(),
    browser: Joi.object({
      colorDepth: Joi.number().integer().required(),
      userAgent: Joi.string().required(),
      language: Joi.string().required(),
      timeZone: Joi.string().required(),
      screenWidth: Joi.number().integer().required(),
      javaEnabled: Joi.boolean().required(),
      customerIp: Joi.string().ip().required(),
      screenHeight: Joi.number().integer().required(),
      windowHeight: Joi.number().integer().required(),
      timeZoneOffset: Joi.number().integer().required(),
      windowWidth: Joi.number().integer().required(),
    }).required(),
  }).required(),
  saveCard: Joi.boolean(),
  merchantInformation: Joi.object({
    name: Joi.string().max(22).required(),
    merchantName: Joi.string().max(22),
    country: Joi.string().length(2),
    address1: Joi.string(),
    administrativeArea: Joi.string(),
    locality: Joi.string(),
    postalCode: Joi.string(),
    url: Joi.string().uri(),
    customerServicePhoneNumber: Joi.string(),
    categoryCode: Joi.string(),
    noteToBuyer: Joi.string(),
  }),
});

export const validateTransaction = (req, res, next) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
