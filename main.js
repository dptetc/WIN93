// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')
const os = require('os');
var path = require('path')
var url = require('url')
var iconpath = path.join(__dirname, 'assets/icons/win/icon.ico')
var mainWindow

if (os.platform() == 'linux') {
    app.disableHardwareAcceleration()
}

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600, icon: iconpath })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
    }))

    var appIcon = new Tray(iconpath)

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                mainWindow.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ])

	//mainWindow.webContents.openDevTools()

    appIcon.setContextMenu(contextMenu)

    mainWindow.on('close', function (event) {
        mainWindow = null
    })

    mainWindow.on('minimize', function (event) {
        event.preventDefault()
        mainWindow.hide()
    })

    mainWindow.on('show', function () {
        appIcon.setHighlightMode('always')
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.