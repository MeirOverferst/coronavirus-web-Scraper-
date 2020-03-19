const puppeteer=require("puppeteer");

(async()=>{

    let worldometersUrl= "https://www.worldometers.info/coronavirus/";

    let browser=await puppeteer.launch();
    let page =await browser.newPage();

    

    await page.goto(worldometersUrl,{waitUntil:"networkidle2"});

    let data = await page.evaluate(()=>{
        let scrape =document.querySelector(' #main_table_countries_today  tbody:first-of-type').innerText;
        return{
            scrape,
        }
    })
    let content =data.scrape.replace(/(\r\n)/,',').split("\n");

    let orderArr = [ ];
    for (let i= 0; i < content.length; i++) {
        orderArr.push([(content[i].replace(/\t/g,' ').replace(/\s/g,',').replace(/'/g,'')
        )]);
    }



    console.log(orderArr);

    
})();


