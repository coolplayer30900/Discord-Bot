const Fortnite = require("fortnite-api");
const req = require('request');

// req.get('https://api.fortnitetracker.com/v1/profile/pc/blitz_cooldabest', headers=>
// {
//     headers: {
//         'key' : '1cd82c85-89da-4e35-a8dd-d587a8b81025';
//     }
// });



const {Client, Attachment, RichEmbed} = require('discord.js');
const bot = new Client();

const token = 'NTg0MzAyNjA3MjQyMjMxODE4.XPI8RQ.c2pR-FA6SwwYjPHk8ah1iZtzAo8';

const PREFIX = '!';

const usedCommandRecently = new Set();

var stats;

bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('Good stuff', { type: 'WATCHING'}).catch(console.error);
})

bot.on('guildMemberAdd', member=>{
    const channel = member.guild.channels.find(channel=> channel.name === "Welcome");
    if (!channel) return;
    member.addRole(r=> r.name("Trainee"));

    channel.send(`Welcome to our server', ${member}, please read the rules in the rules channel!`)
});

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
            case 'embed':
                const embed = new RichEmbed()
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

            case 'randimage':
                if(!usedCommandRecently.has(message.author.username))
                {
                const randImage = new Attachment('https://loremflickr.com/320/240/' + args[1] + '.jpg')
                message.channel.send(message.author + ', Here is the delicious random image you requested', randImage);
                }
                break;

            case 'stats':
                if(!args[1]) return message.channel.send('Please give a user ID to show the stats of');
                req.get({
                    url: 'https://api.fortnitetracker.com/v1/profile/pc/' + args[1],
                    
                    headers: { 
                       'TRN-Api-Key' : '1cd82c85-89da-4e35-a8dd-d587a8b81025'
                    },
                    method: 'GET'
                   },
                 
                   function (e, r, body) {
                       var jsonObj = JSON.parse(body);

                       stats = body;
                       const embed = new RichEmbed()
                    .setTitle('User Information')
                    .addField('Player Name', jsonObj.epicUserHandle)
                    .addField('Platform', jsonObj.platformNameLong, true)
                    .addField('Duration', 'Lifetime')
                    .addField('Matches Played', jsonObj.lifeTimeStats[7].value, true)
                    .addField('Wins', jsonObj.lifeTimeStats[8].value)
                    .addField('Win%', jsonObj.lifeTimeStats[9].value, true)
                    .addField('Kills', jsonObj.lifeTimeStats[10].value)
                    .addField('K/d', jsonObj.lifeTimeStats[11].value, true)
                    .setColor(0xFF5733)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter('Created by Ishan Kumar')
                    
                    message.channel.send(embed);
                   });

                break;

            case 'ezra':
                message.channel.send('Ezra was a great man but he fell down dead after being hit in the face with a cotton ball. \nThis command has been made in the memory of the late Ezra Lalit Jena');
                break;

            case 'ftnchallenges':
                    req.get({
                        url: 'https://api.fortnitetracker.com/v1/challenges' ,
                        
                        headers: { 
                           'TRN-Api-Key' : '1cd82c85-89da-4e35-a8dd-d587a8b81025'
                        },
                        method: 'GET'
                       },
                     
                       function (e, r, body) {
                            var jsonObj = (JSON.parse(body));

                            const embed = new RichEmbed();
                            embed.setTitle('Fortnite Challenges');
                            for(var x = 0; x<= 6; x++)
                            {
                                embed
                                .addField('Challenge ' + (x + 1), jsonObj.items[x].metadata[1].value)
                                .setColor(0xffe900);

                            }
                            message.channel.send(embed);
                            

                       });
                break;

            case 'dog':
                    req.get({
                        url: 'https://dog.ceo/api/breeds/image/random' ,
                        
                        headers: { 
                           
                        },
                        method: 'GET'
                       },
                     
                       function (e, r, body) {
                            var parsejsonObj = JSON.parse(body);
                            var attach = new Attachment(parsejsonObj.message);

                            message.channel.send('HERE IS THE LOVELY DOG IMAGE YOU REQUESTED!!!', attach);
                            

                       });
                break;

            

 
                
                

    }
});

bot.login(token);