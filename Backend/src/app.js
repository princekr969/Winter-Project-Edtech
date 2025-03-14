import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:"http://localhost:5173/",
    credentials: true
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRoutes from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRoutes)
app.get("/", (req, res) => {
    console.log("hello");
    
    res.status(200).json({
        message:"ok"
    });
})


export {app}