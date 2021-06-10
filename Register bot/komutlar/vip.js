const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
    if(!message.member.hasPermission(8)) return;
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let viprol = message.guild.roles.cache.get(config.vipRolü)
    if (!uye) return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisin.`))
    if (uye.roles.cache.has(config.vipRolü)) {
        message.channel.send(embed.setDescription(`${uye} Adlı kullanıcıdan ${viprol} rolü alındı.`))
        uye.roles.remove(viprol)
    } else if (!uye.roles.cache.has(config.vipRolü)) {
        message.channel.send(embed.setDescription(`${uye} Adlı kullanıcıya ${viprol} rolü verildi.`))
        uye.roles.add(viprol)
    }


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'vip',
    permLevel: 0
};