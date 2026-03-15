// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import TaskRoutes from "./routes/taskRoutes.js";

// dotenv.config();

// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/admin", TaskRoutes);

// // DB Connect
// connectDB();

// // Home route
// app.get("/", (req, res) => {
//   res.send("Todo Backend Running ✅");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

// ─── Middleware 
app.use(cors());
app.use(express.json());

// ─── Database 
connectDB();

// ─── Routes 
app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// ─── Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));