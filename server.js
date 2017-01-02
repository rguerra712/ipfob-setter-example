(function(){
    'use strict';

    const ipfob = require('ipfob-setter');
    const dash_button = require('node-dash-button');
    const justonce = require('justonce');
    const settings = require('./config/settings.js');
    const makerWebtask = require('maker-webtask');
    
    function setAlarm() {
        justonce.run(() => {
                console.log("Alarm set");
                ipfob.setAway();
            }, 60,
            () => console.log("Alarm already set, still waiting"));
    }
    
    let dashMacs = settings.dashSettings.dashMacAddress;
    if (dashMacs) {
        dashMacs.foreach(mac => {
            let dash = dash_button(mac, null, null, 'all');
            dash.on("detected", () => {
                setAlarm();
            });
        });    
    }
    
    function turnOnAlarm(message) {
        if (message.command === 'on') {
            setAlarm();
        }
    }
    makerWebtask.run('alarm', 5, turnOnAlarm);

})();