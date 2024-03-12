const {app, BrowserWindow} = require('electron')
const config = require("./config.json");

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false // turn off remote
        },
        autoHideMenuBar: true
    });

    win.loadURL(config.url).then(() => {
        console.log("Microsite loaded successfully");
    })
}

app.whenReady().then(createWindow)
