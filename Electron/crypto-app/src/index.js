const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBTN = document.getElementById('notify')
var price = document.getElementById('price')
var targetPrice = document.getElementById('target-price')
var targetPriceVal

var notification = {
    title: 'BTC Alert', 
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$' + cryptos.toLocaleString('en')

            if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
                const myNotification = new window.Notification(notification.title, notification)
                myNotification.show();
            }
    })
}

getBTC()
setInterval(getBTC, 10000);

notifyBTN.addEventListener('click', function(event){
    const modPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200})
    win.on('close', function() {win = null})
    win.loadURL(modPath)
    win.show()
})

ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})