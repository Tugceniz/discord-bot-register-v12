const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.hasPermission(8)) return;
    let komut = args[0]
    if (!komut) return message.channel.send(embed.setDescription(`Hatalı kullanım örnek: \`.taglıalım aç/kapat\``))
    if (komut === "aç") {
        let data = await db.get(`taglialim.${message.guild.id}`)
        if (data) return message.channel.send(embed.setDescription(`Taglı alım modu zaten aktif.`))
        await db.set(`taglialim.${message.guild.id}`, true)

        message.channel.send(embed.setDescription(`Taglı alım modu başarıyla aktif edildi.`))

    }
    if (komut === "kapat") {
        let data = await db.get(`taglialim.${message.guild.id}`)
        if (!data) return message.channel.send(embed.setDescription(`Taglı alım modu zaten kapalı.`))
        await db.delete(`taglialim.${message.guild.id}`)
        message.channel.send(embed.setDescription(`Taglı alım modu başarıyla kapatıldı.`))

    }
    if (komut !== "aç" && komut !== "kapat") {
        return message.channel.send(embed.setDescription(`Hatalı kullanım örnek: \`.taglıalım aç/kapat\``))
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'taglıalım',
    permLevel: 0
};
