require("dotenv").config();
const express=require("express");
const methodOverRide=require("method-override");
const expressLayout=require("express-ejs-layouts");
const connectDB=require("./server/config/db");
const cookieParser=require("cookie-parser");
const session = require("express-session");
const mongoStore=require("connect-mongo");
const {isActiveRoute}=require("./server/helpers/routeHelpers")


const app=express();
connectDB();

app.use(cookieParser());
app.use(express.static("public"))
app.use(expressLayout);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverRide("_method"));

app.use(session({
    secret:"kphobia963",
    resave:false,
    saveUninitialized:true,
    store:mongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
}))
app.set("view engine","ejs");
app.set("layout","./layouts/main");

app.locals.isActiveRoute=isActiveRoute

app.use("/",require("./server/routes/main"))
app.use("/",require("./server/routes/admin"))

const PORT=process.env.PORT||4000;

app.listen(PORT,()=>console.log(`Server Listening On Port ${PORT}`));