import express from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";
import mainRoutes from "./routes/main.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use(mainRoutes);

setupSwagger(app);

export default app;
