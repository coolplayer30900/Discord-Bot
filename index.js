const {Client, Attachment, RichEmbed} = require('discord.js');
const bot = new Client();

const token = 'NTg0MzAyNjA3MjQyMjMxODE4.XPI8RQ.c2pR-FA6SwwYjPHk8ah1iZtzAo8';

const PREFIX = '!';

const usedCommandRecently = new Set();

bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('Pacman World 2', { type: 'WATCHING'}).catch(console.error);
})

bot.on('guildMemberAdd', member=>{
    const channel = member.guild.channels.find(channel=> channel.name === "Welcome");
    if (!channel) return;

    channel.send(`Welcome to our server', ${member}, please read the rules in the rules channel!`)
});

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
            case 'embed':
                const embed = new Discord.RichEmbed()
                .setTitle('User Information')
                .addField('Player Name', message.author.username, true)
                .addField('Version', '1.0.1')
                .addField('Current Server', message.guild.name)
                .setColor(0xFF5733)
                .setThumbnail(message.author.avatarURL)
                .setFooter('Sub to me')
                message.channel.sendEmbed(embed);
                break;
            
            case "send":
                const attachment = new Attachment('https://i.ytimg.com/vi/kJ2dr9jAThY/maxresdefault.jpg')
                message.channel.send(message.author, attachment);
                break;

            case 'ping':
                if(!message.member.roles.find(r => r.name === "BOSS")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS FOR THIS!!!')
                .then(msg=> msg.delete(4000));
                break;

    }
});

bot.login(token);