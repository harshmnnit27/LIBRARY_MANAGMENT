import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js"
import borrowRouter from "./routes/borrowRouter.js"
import userRouter from "./routes/userRouter.js"
import expressFileupload from "express-fileupload"
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";
config();
export const app = express();
const port=process.env.port || 4000;





// Build allowed origins list once so we can log it and reuse in the CORS policy
const allowedOrigins = [
    process.env.FRONTEND_URL?.replace(/\/$/, ""),
    process.env.BACKEND_URL?.replace(/\/$/, ""),
    "http://localhost:5173",
    "http://localhost:5174",
    // Hardcoded Render URLs as fallback in case env vars are not set
    "https://granthamitra-client.onrender.com",
    "https://granthamitra.onrender.com",
].filter(Boolean); // remove undefined/null entries

// Log allowed origins at startup — useful to verify env config in deployments
console.log("Allowed origins:", allowedOrigins);

// Optional request-level origin logging when DEBUG_CORS is enabled
if (process.env.DEBUG_CORS === "true") {
    app.use((req, res, next) => {
        console.log("Incoming request origin:", req.get("origin"));
        next();
    });
}

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("CORS blocked request from origin:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();



app.use(cookieParser()); // 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(expressFileupload({
     useTempFiles:true,
     tempFileDir:"/tmp/"
}))


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

notifyUsers();
removeUnverifiedAccounts();



app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("API WORKING");
})




