const puppy = require("puppeteer");

let moderators = ["bansalbhavesh47", "bansalbhavesh50"];

async function openBrowser(){
    const browser = await puppy.launch({
        headless: false,          //visibility of browser 
        args:[
            '--start-fullscreen' // to full screen the browser
         ],
        defaultViewport: false ,  //full screen of web page
        // slowMo: 50,
    });

    const tabs = await browser.pages();
    const tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    let usernameInputTab = await tab.$("#input-1");
    let passwordInputTab = await tab.$("#input-2");
    let rememberCheckBox = await tab.$(".checkbox-input");
    let loginButton = await tab.$('[type="button"]');
    await usernameInputTab.type("sekeye9160@secbuf.com");
    await passwordInputTab.type("temp@123");
    await rememberCheckBox.click();
    await loginButton.click();
    await tab.waitForSelector('[data-event-label="StartPreparation"]');
    let StartPreparation = await tab.$('[data-event-label="StartPreparation"]');
    await StartPreparation.click();
    await tab.waitForSelector('[data-analytics="SolvePrepKitChallenge"]');
    let solveChallengeButtons = await tab.$$('[data-analytics="SolvePrepKitChallenge"]');
    let solveChallengeUrls = [];
    for(let solveChallengeButton of solveChallengeButtons){
        solveChallengeUrls.push(
            await tab.evaluate(function(ele){
                return "https://www.hackerrank.com" + ele.getAttribute("href");
            },solveChallengeButton)
        );
    }
    
    const link1 = solveChallengeUrls[0];
    await tab.goto(link1);
    await tab.waitForSelector('[data-attr2="Editorial"]');
    let editorialButton = await tab.$('[data-attr2="Editorial"]');
    await editorialButton.click();
    await tab.waitForSelector(".highlight pre");
    const element = await tab.$(".highlight pre");
    const innerText = await tab.evaluate(element => element.innerText, element);
    await tab.waitForSelector('[data-attr2="Problem"]');
    let problemButton = await tab.$('[data-attr2="Problem"]');
    await problemButton.click();


    await tab.waitForSelector(".view-lines");
    await tab.click('[type="checkbox"]');
    await tab.type('#input-1',innerText);
    await tab.keyboard.down("Command");
    await tab.keyboard.press("A");
    await tab.keyboard.press("X");
    await tab.keyboard.up("Command");
    await tab.click(".view-lines");

    await tab.keyboard.down("Command");
    await tab.keyboard.press("A");
    await tab.keyboard.press("V");
    await tab.keyboard.up("Command");
    await tab.click(".hr-monaco-submit");
    await tab.waitForSelector(".congrats-wrapper");
    

}
openBrowser(); 