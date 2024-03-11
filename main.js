const {app, BrowserWindow} = require('electron')

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false // turn off remote
        }
    })

    win.loadURL('https://dev-viba-testing.mobileinsight.com/?webLinkId=WL-8cd1cfe1-033d-4903-a2f0-3a4954cd60fe')
}

app.whenReady().then(createWindow)
