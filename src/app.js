import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import createTransactionRoute from "./routes/createTransaction.js";
import webhookRoute from "./routes/webhook.js";
import cors from "cors";
import swaggerSpec from "./swagger.js";
import { errorHandler } from "./middleware/error-handler.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("OMNO API INTEGRATION");
});

app.use("/", createTransactionRoute);

app.use("/", webhookRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});

export default app;
