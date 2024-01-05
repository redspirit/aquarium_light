const mqtt = require('mqtt');
const CronJob = require('cron').CronJob;

// const client  = mqtt.connect(`mqtt://192.168.1.39:1883`);
const client  = mqtt.connect(`mqtt://localhost:1883`);

client.on('connect', () => {
    console.log('Mqtt connected ok!');
    client.subscribe('zigbee2mqtt/+', (err) => {
        console.log('error', err)
    })
});

client.on('message', (topic, message) => {
    // message is Buffer
    let data = JSON.parse(message.toString());
    console.log(topic, data);

    if(topic === 'zigbee2mqtt/btn_1' && data.action === 'single') {
        client.publish('zigbee2mqtt/switch_2/set', 'TOGGLE');
    }

    if(topic === 'zigbee2mqtt/lobby_motion') {
        console.log('Set', data.occupancy ? 'ON' : 'OFF');
        client.publish('zigbee2mqtt/mirror_light/set', data.occupancy ? 'ON' : 'OFF');
    }

});

const topic = 'house/powerswitch/cmnd/POWER';
const turnOn = () => {
    client.publish(topic, 'ON');
}

const turnOff = () => {
    client.publish(topic, 'OFF');
}

new CronJob({
    cronTime: '0 0 8 * * 1-5',    // 08:00 в будни
    onTick: turnOn,
    start: true,
    timeZone: 'Europe/Moscow'
});

new CronJob({
    cronTime: '0 0 9 * * 0,6',    // 09:00 в выходные
    onTick: turnOn,
    start: true,
    timeZone: 'Europe/Moscow'
});

new CronJob({
    cronTime: '0 0 22 * * *',    // 22:00
    onTick: turnOff,
    start: true,
    timeZone: 'Europe/Moscow'
});
