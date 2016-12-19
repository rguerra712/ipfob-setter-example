(function(){
    'use strict';

    const ipfob = require('ipfob-setter');
    const dash_button = require('node-dash-button');
    const moment = require('moment');

    let dashMac = '0c:47:c9:04:94:a4';
    let dash = dash_button(dashMac, null, null, 'all');
    let lastEntryTime;

    dash.on("detected", () => {
        let secondsDiff = moment().diff(lastEntryTime, 'seconds');
        if (lastEntryTime && secondsDiff < 60)
        {
            console.log("Alarm already set, still waiting");
            return;
        }
        console.log("Alarm set");
        ipfob.setAway();
        lastEntryTime = moment();
    });
})();