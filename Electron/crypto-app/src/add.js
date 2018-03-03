const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBTN = document.getElementById('closeBTN')

closeBTN.addEventListener('click', function(event){
    var window = remote.getCurrentWindow()
    window.close()
})

const updateBtn = document.getElementById('update')

updateBtn.addEventListener('click', function(){
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

    var window = remote.getCurrentWindow();
    window.close()
})