const { ShardingManager } = require('discord.js');
const {key} = require ('./config.json')
const manager = new ShardingManager('./index.js', { token: key.token });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();