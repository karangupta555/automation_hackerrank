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
    // // console.log(browser);
    // let tabs = await browser.pages();  //array of already opened tabs
    // // console.log(tabs.length);
    // // console.log(tabs);
    // let currentTab = tabs[0];  //current tab mein 1st tab ka location hai
    // await currentTab.goto("https://www.google.com");
    ///////////////////////////////////////
    // browser.pages().then(function(tab){
    //     tab[0].goto("https://www.google.com")
    // })
    // for(let i=0;i<9;i++){
    //     browser.newPage().then(function(tab){
    //         tab.goto("https://www.google.com");
    //     });
    // }
    ////////////////////////////////////////
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
    await tab.waitForNavigation({waitUntil: "networkidle2"}); 
    await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]',{
        visible: true
    })
    let profileClick = await tab.$('[data-analytics="NavBarProfileDropDown"]');
    await profileClick.click();
    let administrationButton = await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]');
    await administrationButton.click();
    await tab.waitForSelector(".admin-tabbed-nav a");
    let administrationTabs = await tab.$$(".admin-tabbed-nav a");
    await administrationTabs[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    await createChallengeButton.click();
    await tab.waitForSelector("#input_format-container .CodeMirror-code");
    try {
        let discardButton = await tab.$("#cancelBtn");
        await discardButton.click();
    } catch (err) {
        
    }
    let challengeNameInput = await tab.$("#name");
    let challengeDescriptionInput = await tab.$("#preview");
    await challengeNameInput.type("Temporary2");
    await challengeDescriptionInput.type("temp1");
    let codeTextAreas = await tab.$$(".CodeMirror-code");
    await tab.evaluate(()=>{
        window.scrollBy(0,window.innerHeight);
    })
    for(let i in codeTextAreas){
            await codeTextAreas[i].click();
            await codeTextAreas[i].type("temp1");
    }
    await tab.waitForSelector("#tags_tagsinput");
    let tagsTextArea = await tab.$("#tags_tagsinput");
    await tagsTextArea.click();
    await tagsTextArea.type("kjdsbf");
    await tab.keyboard.press("Enter");
    let saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
    await saveChangesButton.click();
    await tab.waitForSelector('[data-tab="moderators"]');
    let moderatorButton = await tab.$('[data-tab="moderators"]');
    await moderatorButton.click();
    await tab.waitForSelector("#moderator")
    let moderatorTextArea = await tab.$("#moderator");
    for(let moderator of moderators) {
        await moderatorTextArea.type(moderator);
        await tab.keyboard.press("Enter");
    }
    await tab.waitForSelector(".save-challenge.btn.btn-green");
    saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
    await saveChangesButton.click();
    
    
    
    



    
    
}
openBrowser();   






