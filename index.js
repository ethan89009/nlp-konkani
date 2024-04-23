const express = require("express")
const app = express()
const {getTranslation} = require('./getdata');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

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