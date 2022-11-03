const express = require('express');
const Promise = require('bluebird');
const os = require('os');

const server = express();

server.get('/', function(req, res) {
    getInfo().then(function(info) {
        res.json(info);
    }).catch(function(err) {
        res.json(400, err)
    });
});

server.listen(8000, function() {
    getInfo().then(function(info) {
        console.log('\n')
        console.log(info.userHostInfo);
        console.log('-----------------')
        console.log('Operating System:', info.os);
        console.log('Kernel:', info.kernel);
        console.log('Public IP:', info.ip);
        console.log('CPU:', info.cpu);
        console.log('Memory:', info.memory);
        console.log('Uptime:', info.uptime);
        console.log('\n')
        process.exit(0);
    }).catch(function(err) {
        console.warn(err);
    });
});

async function getInfo() {
    return await new Promise(function(resolve, reject) {    
        const info = {};
        info.userHostInfo = os.userInfo().username + '@' + os.hostname()
        info.os = os.platform() + ' ' + os.arch();
        info.kernel = os.release();
        info.ip = os.networkInterfaces().eth0[0].address;
        info.cpu = os.cpus()[0].model;
        info.memory = (Math.floor(os.freemem()) / 1048576).toFixed(0) + 'MB' + ' / ' + (Math.floor(os.totalmem()) / 1048576).toFixed(0) + 'MB'
        info.uptime = Math.floor(os.uptime() / 3600) % 60 + ' hours, ' + Math.floor(os.uptime() / 60) % 60 + ' minutes and ' + Math.floor(os.uptime()) % 60 +' seconds'
        resolve(info)
    }).then(function(info) {
        return info;
    }).catch(function(err) {
        console.warn(err);
    });
}
