import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ["https://winter-project-edtech.vercel.app","http://localhost:5173"],
    credentials: true
}))

app.set("trust proxy", 1)

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRoutes from "./routes/user.routes.js"
import courseRoutes from "./routes/course.routes.js"
import lessonRoutes from "./routes/lesson.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

//routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/lesson", lessonRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
    console.log("hello");
    
    res.status(200).json({
        message:"ok"
    });
})


export {app}
