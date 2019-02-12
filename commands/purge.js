exports.run = async (client, message, args, level) => {
  try {
    let num;

    if (!isNaN(args)) {
      num = parseInt(args[0]);

      if (num >= 100 && num && num !== 0) {
        message.reply('You must enter a number under 100 for me to clear!');
      } else {
        message.channel.bulkDelete(num + 1);
      }
    } else {
      message.reply('You must enter a number under 100 for me to clear!');
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['clear', 'c'],
  guildOnly: true,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'purge',
  category: 'Moderation',
  description: 'Purges the amount of messages you specify',
  usage: 'purge <1-100>'
};