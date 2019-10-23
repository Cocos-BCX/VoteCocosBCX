'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    context = context || {};
    let appPath = context.appRoot || process.cwd();

    let configDir = path.join(appPath, 'config');
    let configFiles = fs.readdirSync(configDir);

    let env = context.env || process.env.NODE_ENV || 'development';
    let envConfigFile = `${configDir}/env/${env}.js`;

    let config = {};
    let envConfig = {};
    let localConfig = {};

    configFiles.forEach(file => {
        if(!file.endsWith('.js')) {
            return;
        }

        let fileContent = loadFile(path.join(configDir, file));
        if(file === 'local.js'){
            localConfig = fileContent;
        }
        else {
            _.merge(config, fileContent);
        }
    });

    if(fs.existsSync(envConfigFile)) {
        envConfig = loadFile(envConfigFile);
    }

    _.merge(config, envConfig, localConfig);
    return config
};

function loadFile(filePath) {
    let content = null;
    try {
        content = require(filePath);
    }
    catch(e) {
        console.warn(`Failed to require ${filePath}, error ${e}`);
    }
    return content;
}


