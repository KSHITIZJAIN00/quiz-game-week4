const express = require("express");
const f = require("fs");
const path = require("path");
const cors = require("cors");


const app=express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/question",(req,res)=>{
    f.readFile("questions.json","utf8",(err,data)=>{
       res.json(JSON.parse(data));
    });
});

app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
});