const puppeteer = require("puppeteer");

const getTranslation = async (res,textToTranslate)=>{

    const browser = await puppeteer.launch({
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


