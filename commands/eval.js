exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const code = args.join(' ');
  try {
    const evaled = eval(code.replace('process.env.BOT_TOKEN', 'client.config.token'));
    const clean = await client.clean(client, evaled);
    message.author.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.author.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Bot Developer'
};

exports.help = {
  name: 'eval',
  category: 'System',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [code]'
};
