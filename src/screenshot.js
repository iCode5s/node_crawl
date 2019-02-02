const  puppeteer=require("puppeteer");
const axios = require('axios');
const conf=require("./config/defaultConfig")
async function get_debug_url() {
    var rsp = await axios.get('http://127.0.0.1:9222/json');
        return rsp.data[0].webSocketDebuggerUrl;
}
(async ()=>{
    var ws = await get_debug_url();
    console.log(ws)
    const browser =  await puppeteer.launch({
        executablePath: './Chromium.app/Contents/MacOS/Chromium',
        headless: false
    });
    // console.log(browser)
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    console.log(conf)
    await page.screenshot({path: `${conf.screenshot}/${Date.now()}.png`});

    await browser.close();
})();
