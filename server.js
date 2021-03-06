'use strict';

const Discord = require('discord.js');
const path = require('path');
const utils = require(path.join(__dirname, 'utils.js'));

const client = new Discord.Client();

const commands = {
    help: 'help',
    pomoc: 'help',
    status: 'status',
    gracz: 'playerInfo',
    cuboid: 'cuboidInfo',
    serwer: 'serverInfo',
    rzut: 'diceRoll'
};

for(const name in commands) {
    commands[name] = require(path.join(__dirname, 'commands', commands[name] + '.js'));
}

client.on('ready', () => {
    client.user.setActivity('!pomoc | v1.0.6');
    console.log('Client is ready!');
});

client.on('message', message => {
    const args = message.content.split(/\s+/);
    
    if (args[0].startsWith('!')) {
         const command = args[0].slice(1);
         
         if (command in commands) {
             message.channel.startTyping();

             const commandParameters = {
                 message: message,
                 args: args.slice(1),
                 utils: utils  
             };

             commands[command](commandParameters).then(() => {
                message.channel.stopTyping();
             }).catch(error => {
                message.reply('wystąpił błąd!');
                message.channel.stopTyping();
                console.error(error);
             });
         }
    }
});

client.login(utils.config.token);
