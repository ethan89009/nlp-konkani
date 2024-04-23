const puppeteer = require("puppeteer");
require("dotenv").config();

const getTranslation = async (res,textToTranslate)=>{

    const browser = await puppeteer.launch({
        args:[
            "",
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        executablePath : process.env.NODE_ENV === "production" ? 
        process.env.PUPPETEER_EXECUTABLE_PATH
        :puppeteer.executablePath(),
        headless: true,
      });

    try{
      const page = await browser.newPage();
      await page.goto(
        "https://www.easyhindityping.com/english-to-konkani-translation"
      );
      await page.waitForSelector("#SourceTextarea");
      await page.type("#SourceTextarea", textToTranslate);
      await page.click("#SubmitTranslation");
    let translatedText = ""
    while(translatedText == ""){
            translatedText = await page.evaluate((el) => {
                const value = document.querySelector("#TargetTextarea").value;
                return value;
              });
    }
    res.send(translatedText)
 }
 catch(error){
    // console.log(error)
    res.send("Send again")
 }finally{
    if(browser){
        await browser.close();
    }
 }
}

module.exports = {getTranslation}


