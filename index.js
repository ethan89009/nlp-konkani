const express = require("express")
const app = express()
const {getTranslation} = require('./getdata');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/",(req,res)=>{
    res.send("Hello!")
})

app.post("/translate",async (req,res)=>{
    const textToTranslate =  req.body.text
    getTranslation(res,textToTranslate)
})

app.listen(PORT,()=>{
    console.log(`on port ${PORT}`)
})