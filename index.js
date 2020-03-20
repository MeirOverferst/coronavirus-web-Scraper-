const puppeteer = require("puppeteer");

(async () => {
    const _ = require('lodash');
    let worldometersUrl = "https://www.worldometers.info/coronavirus/";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();



    await page.goto(worldometersUrl, {
        waitUntil: "networkidle2"
    });

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
            tCasesPerMilOrg
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

    
const result = _.map(
    _.zip(arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9),
    _.partial(_.zipObject, ["Country/Other", "Total Cases","New Cases","Total Deaths","Total Recovered","Active Cases","Serious,Critical","Total Cases per Million"])
  )
  
  console.log(result)

})();
