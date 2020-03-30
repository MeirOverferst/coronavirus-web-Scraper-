const express =require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const router = express.Router();
app.use("/api",router)
let fs = require('fs');
const puppeteer = require("puppeteer");
process.setMaxListeners(Infinity);
var cron = require('node-cron');

cron.schedule('*/10 * * * *', () => {
console.log('running a task every 20 minutes');

 (async () => {
        const _ = require('lodash');
        let worldometersUrl = "https://www.worldometers.info/coronavirus/";

        const browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        });
        let page = await browser.newPage();
        await page.goto(worldometersUrl, { waitUntil: "networkidle2"});

        console.log("puppeteer is on");

        const data = await page.evaluate(() => {
            /// 
            let sorting = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > .sorting'));
            ///
            let cNames = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(1)'));
            let tCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(2)'));
            let nCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(3)'));
            let tDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(4)'));
            let nDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(5)'));
            let rRecov = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(6)'));
            let aCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(7)'));
            let Sccases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(8)'));
            let tCasesPerMil = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(9)'));
            let tDeathssPerMil = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(10)'));
            let fRepoCase = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(11)'));


            let sortingOrg = sorting.map(td => td.innerText);
            let cNamesOrg = cNames.map(td => td.innerText);
            let tCasesOrg = tCases.map(td => td.innerText);
            let nCasesOrg = nCases.map(td => td.innerText);
            let tDeathsOrg = tDeaths.map(td => td.innerText);
            let nDeathsOrg = nDeaths.map(td => td.innerText);
            let rRecovOrg = rRecov.map(td => td.innerText);
            let aCasesOrg = aCases.map(td => td.innerText);
            let SccasesOrg = Sccases.map(td => td.innerText);
            let tCasesPerMilOrg = tCasesPerMil.map(td => td.innerText);
            let tDeathssPerMilOrg = tDeathssPerMil.map(td => td.innerText);
            let fRepoCaseOrg = fRepoCase.map(td => td.innerText);

            
            return {
                sortingOrg,
                cNamesOrg,
                tCasesOrg,
                nCasesOrg,
                tDeathsOrg,
                nDeathsOrg,
                rRecovOrg,
                aCasesOrg,
                SccasesOrg,
                tCasesPerMilOrg,
                tDeathssPerMilOrg,
                fRepoCaseOrg
            }
        })

        let arr1 = data.cNamesOrg;
        let arr2 = data.tCasesOrg;
        let arr3 = data.nCasesOrg;
        let arr4 = data.tDeathsOrg;
        let arr5 = data.nDeathsOrg;
        let arr6 = data.rRecovOrg;
        let arr7 = data.aCasesOrg;
        let arr8 = data.SccasesOrg;
        let arr9 = data.tCasesPerMilOrg;
        let arr10 = data.tDeathssPerMilOrg;
        let arr11 = data.fRepoCaseOrg;
        
        // console.log(arr11);
        
        

        const result = _.map(
        _.zip(arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9,arr10,arr11),
        _.partial(_.zipObject, ["Country/Other", "Total Cases","New Cases","Total Deaths","New Deaths","Total Recovered","Active Cases","Serious,Critical","Total Cases per Million","Total Deaths per Million","Reported first Case"])
        )
       console.log( "got the results");

       fs.writeFile('./db/updateData.json',JSON.stringify(result), function (err) {
       if (err) return console.log(err);
        console.log('results > updateData.json');
      });
      console.log('done writing');
     await browser.close();
    })();


  });


router.get('/', (req, res) => {

  fs.readFile('./db/updateData.json', (err, json) => {
      let obj = JSON.parse(json);
      res.json(obj);
  });

});



app.listen(PORT,()=>{
  console.log("App Running");
  
})

