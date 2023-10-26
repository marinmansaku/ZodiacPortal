const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  // Create the browser window.
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // win.webContents.print(options, (success, failureReason) => { 
  //   if (!success) console.log(failureReason); 

  //   console.log('Print Initiated'); 
  // }); 
  ipcMain.handle('ping', async (event, data) => { 
    // BrowserWindow.getAllWindows()[0].webContents.print({silent: true})
    const printWindow = new BrowserWindow({
      width: 800,
      height: 200,
    });
    printWindow.hide();
    await printWindow.loadURL('http://localhost:3000/print?alloy=' + data.alloy +'&batchNumber=' + data.batchNumber + '&grossWeight=' + data.grossWeight + '&netWeight=' + data.netWeight);
    printWindow.webContents.print({silent: true});
  });
  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.