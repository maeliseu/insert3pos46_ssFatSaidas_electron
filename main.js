const { app, BrowserWindow } = require('electron')

/** Define window's variable in the global scope */
let win;

function createWindow () {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carrega o arquivo index.html do seu aplicativo.
  win.loadFile('index.html')

  // Abrir o DevTools (aba de ferramentas para desenvolvedores).
  // win.webContents.openDevTools()
}

// Este método será chamado quando Electron terminar de inicializar
// e também estiver pronto para criar novas janelas do navegador.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

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

// Nesse arquivo, você pode incluir o resto do código principal
// de processos do seu aplicativo.
// Você também pode colocar eles em arquivos separados e requeridos-as aqui.
var myVar = setInterval(myTimer ,1000);
const {ipcMain}     	= require('electron');



// function readTextFile(file)
// {
//   var fs = require('fs');
//   var array = fs.readFileSync(file, 'UTF-8').toString().split("\n");
  
//   return array;
// }



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
      file.write(lineItens.join('|'));
      cont_line ++;
      
  })
  console.log(cont_line);

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


function myTimer() {
    var d = new Date(), displayDate;   
    displayDate = d.toLocaleTimeString('pt-BR', {timeZone: 'America/Belem'});
    
    // //envia para render no canal "displayDate" o valor de displayDate
    // win.webContents.send("displayDate", displayDate);
    
    
}