const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))

    if (uye.id === client.user.id) return message.channel.send(embed.setDescription(`Beni Kayısıza atamazsın!`))
    if (uye.id === message.author.id) return message.channel.send(embed.setDescription(`Kendini Kayıtsıza Atamazsın!`))
    uye.roles.set([config.kayıtsızRolü])
    uye.setNickname(`${config.unTag} İsim | Yaş`)
    message.channel.send(embed.setDescription(`${uye} Adlı Kullanıcı ${message.author} Tarafından Başarıyla Kayıtsıza Atıldı.`)).then(x => x.delete({ timeout: 7000 }))
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıtsız'],
    name: 'unregister',
    permLevel: 0
};
