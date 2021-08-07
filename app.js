const mqtt = require('mqtt');
const CronJob = require('cron').CronJob;

const client  = mqtt.connect(`mqtt://192.168.1.47:1883`, {
    clientId: 'device-service',
    username: '',
    password: '',
    clean: true
});

client.on('connect', () => {
    console.log('Mqtt connected ok!');
    // client.subscribe('house/powerswitch', (err) => {
    //     console.log('Subscribe to', config.subscribe);
    // })
});

const topic = 'house/powerswitch/cmnd/POWER';

const turnOn = () => {
    client.publish(topic, 'ON');
}

const turnOff = () => {
    client.publish(topic, 'OFF');
}

new CronJob({
    cronTime: '0 0 9 * * *',    // 08:00
    onTick: turnOn,
    start: true,
    timeZone: 'Europe/Moscow'
});

new CronJob({
    cronTime: '0 0 23 * * *',    // 23:00
    onTick: turnOff,
    start: true,
    timeZone: 'Europe/Moscow'
});
