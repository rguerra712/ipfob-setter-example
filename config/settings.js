(function(){
    'use strict';

    const commandLineArgs = require('command-line-args');
    const optionDefinitions = [
        { name: 'dashmacs', alias: 'm', type: String, defaultOption: '' }
    ];
    const options = commandLineArgs(optionDefinitions);

    let settings = {};

    settings.dashMacAddresses = options.dashmacs;
    
    if (!settings.dashMacAddresses && process.env.IPFOB_MAC_ADDRESSES){
        settings.dashMacAddresses = process.env.IPFOB_MAC_ADDRESSES; 
    }

    if (settings.dashMacAddresses) {
        settings.dashMacAddresses = settings.dashMacAddresses.split(' ');
    }
    exports.dashSettings = {
        dashMacAddress: settings.dashMacAddress
    };
})();