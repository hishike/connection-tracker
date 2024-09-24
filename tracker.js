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
    console.log('Verificando a conexão...');
    ping.promise.probe('8.8.8.8')
        .then(isUp => {
            console.log(`Resultado do ping: ${isUp.alive}`);
            if (isUp.alive) {
                if (!connected) {
                    registerEvent('Conectado com a internet');
                    connected = true;
                } else {
                    registerEvent('Conexão ainda ativa');
                }
            } else {
                if (connected) {
                    registerEvent('Sem conexão');
                    connected = false;
                }
            }
        })
        .catch(error => {
            console.error('Erro ao verificar a conexão:', error);
        })
        .finally(() => {
            setTimeout(connectionMonitor, 60000);
        });
}

connectionMonitor();
