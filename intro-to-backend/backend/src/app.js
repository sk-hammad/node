import express from "express";
import router from "./routes/user.route.js";
const app = express();
app.use(express.json());

app.use("/api/v1/users",router);

// example route http://localhost:4000/pai/v1/users/register
export default app;