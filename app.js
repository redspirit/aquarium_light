const mqtt = require('mqtt');
const CronJob = require('cron').CronJob;

//const client  = mqtt.connect(`mqtt://192.168.1.47:1883`);
const client  = mqtt.connect(`mqtt://localhost:1883`);

client.on('connect', () => {
    console.log('Mqtt connected ok!');
    // client.subscribe('house/powerswitch', function (err) {
    //     console.log('error', err)
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
    cronTime: '0 0 8 * * 1-5',    // 08:00
    onTick: turnOn,
    start: true,
    timeZone: 'Europe/Moscow'
});

new CronJob({
    cronTime: '0 0 9 * * 6-7',    // 09:00
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
