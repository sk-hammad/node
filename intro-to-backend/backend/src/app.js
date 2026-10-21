import express from "express";
const app = express();
app.use(express.json());

import router from "./routes/user.route.js";
import Postrouter from "./routes/post.route.js";
app.use("/api/v1/users",router);
app.use("/api/v1/posts",Postrouter)

// example route http://localhost:4000/pai/v1/users/register
export default app;