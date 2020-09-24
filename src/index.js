const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


/** Define window's variable in the global scope */
let mainWindow;


const createWindow = () => {
  // Create the browser window.
  // const 
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.on('close-me', (evt, arg) => {
  app.quit()
});

ipcMain.on('execute', (evt, arg) => {
  // const { dialog } = require('electron')

  // const response = dialog.showMessageBox({
  //   title: 'alert',
  //   message: arg,
  // });

  const fs = require('fs');
  // const readline = require('readline');
  const data = fs.readFileSync(arg, "utf-8");
  var array = data.split('\n');
  array = array.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});

  
  var file = fs.createWriteStream(arg+".modificado.txt", "utf-8");
  var cont_line = 0;

  array.forEach((line) => {
      
      var lineItens = line.split("|");
      lineItens[45] ? lineItens[45]="3" : console.log("fim");
      file.write(lineItens.join('|')+"\n");
      cont_line ++;
      
  })
  // console.log(cont_line);
  mainWindow.webContents.send("displayProcessadas", cont_line);

  // for(i in array) {
  //   line_list = array[i].split("|")
  //   line_list[45]=3   // posição 46
  //   console.log(line_list);
  //   file.write(line_list.join('|')+"\n");
  // }

  
  // file.on('error', function(err) { /* error handling */ });
  // arr.forEach(function(v) { file.write(v.join(', ') + '\n'); });
  file.end();

});

