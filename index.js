const puppeteer = require("puppeteer");

(async () => {

    let worldometersUrl = "https://www.worldometers.info/coronavirus/";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();



    await page.goto(worldometersUrl, {
        waitUntil: "networkidle2"
    });

    const data = await page.evaluate(() => {
        //    const scrape = Array.from(Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(1)'))) ;
        let sorting = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > .sorting'));
       
        let cNames = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(1)'));
        let tCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(2)'));
        let nCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(3)'));
        let tDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(4)'));
        let nDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(5)'));
        let rRecov = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(6)'));
        let aCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(7)'));

        let sortingOrg = sorting.map(td => td.innerText);
        let cNamesOrg = cNames.map(td => td.innerText);
        let tCasesOrg = tCases.map(td => td.innerText);
        let nCasesOrg = nCases.map(td => td.innerText);
        let tDeathsOrg = tDeaths.map(td => td.innerText);
        let nDeathsOrg = nDeaths.map(td => td.innerText);
        let rRecovOrg = rRecov.map(td => td.innerText);
        let aCasesOrg = aCases.map(td => td.innerText);




        return {
            sortingOrg,
            cNamesOrg,
            tCasesOrg,
            nCasesOrg,
            tDeathsOrg,
            nDeathsOrg,
            rRecovOrg,
            aCasesOrg
        }

    })

    console.log("data.sortingOrg",data.sortingOrg);
    console.log("data.cNamesOrg",data.cNamesOrg);
    console.log("data.tCasesOrg",data.tCasesOrg);
    console.log("data.nCasesOrg",data.nCasesOrg);
    console.log("data.tDeathsOrg",data.tDeathsOrg);
    console.log("data.nDeathsOrg",data.nDeathsOrg);
    console.log("data.rRecovOrg",data.rRecovOrg);
    console.log("data.aCasesOrg",data.aCasesOrg);

    console.log("data.cNamesOrg.length)",data.cNamesOrg.length);
    console.log("data.tCasesOrg.length)",data.tCasesOrg.length);
    console.log("data.nCasesOrg.length)",data.nCasesOrg.length);
    console.log("data.tDeathsOrg.length)",data.tDeathsOrg.length);
    console.log("data.nDeathsOrg.length)",data.nDeathsOrg.length);
    console.log("data.rRecovOrg.length)",data.rRecovOrg.length);
    console.log("data.aCasesOrg.length)",data.aCasesOrg.length);




})();


//const puppeteer = require("puppeteer");

// (async () => {

//     let worldometersUrl = "https://www.worldometers.info/coronavirus/";

//     let browser = await puppeteer.launch();
//     let page = await browser.newPage();

//     await page.goto(worldometersUrl, {
//         waitUntil: "networkidle2"
//     });

//     let data = await page.evaluate(() => {
//         let cNames = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(1)'));
//         let tCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(2)'));
//         let nCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(3)'));
//         let tDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(4)'));
//         let nDeaths = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(5)'));
//         let rRecov = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(6)'));
//         let aCases = Array.from(document.querySelectorAll('#main_table_countries_today [role="row"] > td:nth-child(7)'));
//         return {
//             cNames,
//             tCases,
//             nCases,
//             tDeaths,
//             nDeaths,
//             rRecov,
//             aCases
//         }
//     })



// ///scraping counties names and printing
// let cNamesArr= [ ];
// for (let i = 0; i < data.cNames.length; i++) {
// cNamesArr.push(data.cNames[i].textContent);
// }
// console.log(cNamesArr);


// ///scraping total cases and printing
// let tCasesArr = [ ];
// for (let i = 0; i < data.tCases.length; i++) {
//     tCasesArr.push(data.tCases[i].textContent);
//     }
//     console.log(tCasesArr);
// ///scraping new cases and printing
// let nCasesArr = [ ];
// for (let i = 0; i < data.nCases.length; i++) {
//     nCasesArr.push(data.nCases[i].textContent);
//     }
//     console.log(nCasesArr);

// ///scraping total deaths and printing
//     let tDeathsArr= [ ];
//     for (let i = 0; i < data.tDeaths.length; i++) {
//         tDeathsArr.push(data.tDeaths[i].textContent);
//     }
//     console.log(tDeathsArr);
//  ///scraping new deaths and printing
// let nDeathsArr= [ ];
// for (let i = 0; i < data.nDeaths.length; i++) {
//     nDeathsArr.push(data.nDeaths[i].textContent);
// }
// console.log(nDeathsArr);

//  ///scraping total recovers and printing
//  let rRecovArr= [ ];
//  for (let i = 0; i < data.rRecov.length; i++) {
//     rRecovArr.push(data.rRecov[i].textContent);
//  }
//  console.log(rRecovArr);

//  ///scraping active cases and printing
// let aCasesArr = [ ];
// for (let i = 0; i < data.aCases.length; i++) {
//     aCasesArr.push(data.aCases[i].textContent);
//     }
//     console.log(aCasesArr);

// })();