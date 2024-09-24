const ping = require('ping');
const fs = require('fs');

let connected = false;

function registerEvent(event) {
    const data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    fs.appendFile('log_internet.txt', `${data}: ${event}\n`, err => {
        if (err) throw err;
    });

    console.log(`${data}: ${event}`);
}

function connectionMonitor() {
    ping.sys.probe('8.8.8.8', function(isUp) {
        if (isUp && !connected) {
            registerEvent('Conectado com a internet');
            connected = true;
        } else if (!isUp && connected) {
            registerEvent('Sem conexão');
            connected = false;
        }
    });
}

setInterval(connectionMonitor, 300000);