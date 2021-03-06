'use strict';

const apifcraftpl = require('api-fcraft.pl');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const icons = {
    'freedom': 'https://wiki.fcraft.pl/images/0/00/Wolność.png',
    'property': 'https://wiki.fcraft.pl/images/e/e3/Własność.png',
    'economy': 'https://wiki.fcraft.pl/images/5/52/Ekonomia.png',
    'survival': 'https://wiki.fcraft.pl/images/6/60/Survival.png'
};

const api = new apifcraftpl(config.key);
const assets = {};
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.js')));

exports.api = api;
exports.config = config;

exports.embed = (name, icon) => {
    const embed = new discord.RichEmbed();
    embed.setAuthor(name, icons[icon]);
    embed.setColor('FFF000');
    
    return embed;
};

exports.asset = asset => {
    if(!assets[asset]) {
        assets[asset] = fs.readFileSync(path.join(__dirname, 'assets', asset), 'utf8');
    }
    
    return assets[asset];
};

exports.capitalize = text => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};

exports.escapeMarkdown = text => {
    return text.replace('_', '\\_');
};

exports.date = timestamp => {
    return moment(timestamp * 1000).format('DD.MM.YYYY');
};

exports.datetime = timestamp => {
    return moment(timestamp * 1000).format('DD.MM.YYYY HH:mm');
};

exports.isActive = timestamp => {
    return moment(timestamp * 1000).isSameOrAfter(moment().subtract(30, 'days'));
};
