const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
 const settings = message.settings;
  const defaults = client.config.defaultSettings;
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  
  if (args[0] === 'edit') {
    if (!args[1]) return message.reply('Please specify a key to edit');
    if (!defaults[args[1]]) return message.reply('This key does not exist in the settings');
    const joinedValue = args.join(' ');
    if (joinedValue.length < 1) return message.reply('Please specify a new value');
    if (joinedValue === settings[args[1].slice(2)]) return message.reply('This setting already has that value!');
    
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.set(message.guild.id, args.slice(2).join(' '), args[1]);

    message.reply(`${args[1]} successfully edited to ${args.slice(2).join(' ')}`);
  } else
  
  if (args[0] === 'del' || args[0] === 'reset') {
    if (!args[1]) return message.reply('Please specify a key to reset.');
    if (!defaults[args[1]]) return message.reply('This key does not exist in the settings');
    if (!overrides[args[1]]) return message.reply('This key does not have an override and is already using defaults.');
    
    const response = await client.awaitReply(message, `Are you sure you want to reset ${args[1]} to the default value?`);

    if (['y', 'yes'].includes(response.toLowerCase())) {
      client.settings.delete(message.guild.id, args[1]);
      message.reply(`${args[1]} was successfully reset to default.`);
    } else
    if (['n','no','cancel'].includes(response)) {
      message.reply(`Your setting for \`${args[1]}\` remains at \`${settings[args[1]]}\``);
    }
  } else
  
  if (args[0] === 'get') {
    if (!args[1]) return message.reply('Please specify a args[1] to view');
    if (!defaults[args[1]]) return message.reply('This args[1] does not exist in the settings');
    const isDefault = !overrides[args[1]] ? '\nThis is the default global default value.' : '';
    message.reply(`The value of ${args[1]} is currently ${settings[args[1]]}${isDefault}`);
  } else {
    const array = [];
    Object.keys(client.getSettings(message.guild.id)).forEach((setting) => array.push(setting + ': ' + settings[setting]));
    
    const embed = new Discord.RichEmbed()
    .setTitle('Server Settings')
    .setDescription(`Current Guild Settings\n${array.join('\n')}`)
    .setColor('#eeeeee');
    await message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  aliases: ['setting', 'settings', 'conf', 'set', 'config'],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'configure',
  category: 'Moderation',
  description: 'View or change settings for your server.',
  usage: 'configure <view/get/edit> <args[1]> <value>'
};
