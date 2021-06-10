const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))
    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.channel.send(embed.setDescription(`${message.author}, Bir İsim Belirtmelisin.`)).then(m => m.delete({ timeout: 7000 }))
    let name = `${uye.user.username.includes(config.tag) ? config.tag : config.unTag} ${isim} | ${yaş}`
    if (uye.id === client.user.id) return message.channel.send(embed.setDescription(`Beni Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    if (uye.id === message.author.id) return message.channel.send(embed.setDescription(`Kendini Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    let data = await db.get(`taglialim.${message.guild.id}`)
    if (data) {
        if (!uye.user.username.includes(config.tag) && !uye.roles.cache.has(config.boosterRolü) && !uye.roles.cache.has(config.vipRolü)) return message.channel.send(embed.setDescription(`Sunucumuz şuanda taglı alımdadır tagımızı alarak kayıt işlemini gerçekleştirebilirsiniz. \`.tag\`Komutu ile tagımızı görebilirsiniz.`))
    }
    if (config.kızRolleri.some(e => uye.roles.cache.has(e))) return message.channel.send(embed.setDescription(`Bu Kullanıcı Zaten Kayıtlı.`)).then(m => m.delete({ timeout: 7000 }))

    let x = await db.get(`isimler.${uye.id}`)
    if (x) {
        let isimlerr = x.filter(uye => uye.userID === uye.id).map((cross, index) => `\`${cross.isim}\` (<@&${cross.rol}>)`).splice(0, 10)

        message.channel.send(embed.setDescription(`
        ${uye} kişisinin ismi başarıyla \`${name}\` olarak değiştirildi, bu üye daha bu isimlerle kayıt olmuş.

        ${config.no} Kişinin toplamda ${isimlerr.length} isim kayıtı bulundu
        ${isimlerr.join("\n")}`)).then(m => m.delete({ timeout: 10000 }))
    }
    if (!x) {
        message.channel.send(embed.setDescription(`

      Hoşgeldin ${uye} İyi eğlenceler dileriz. 
        
       Sunucuda olan etkinliklere katılmayı unutma. 

        ${uye} kişisinin ismi başarıyla \`${name}\` olarak değiştirildi, ${message.guild.roles.cache.get(config.kız1)} rolleri verildi.
        
        Kişinin Daha Önce Kaydı Bulunamadı
   
        `)).then(m => m.delete({ timeout: 15000 }))
    }

    if (uye.roles.cache.has(config.vipRolü) ? await uye.roles.set(config.kızRolleri) && uye.roles.add(config.vipRolü) : uye.roles.set(config.kızRolleri))
                if (uye.user.username.includes(config.tag)) uye.roles.add(config.Family)
   uye.setNickname(name)

    await db.add(`teyit.${message.author.id}.kadın`, 1)
    await db.add(`teyit.${message.author.id}.toplam`, 1)
    await db.push(`isimler.${uye.id}`, { isim: name, rol: config.kız1, yetkili: message.author.id, zaman: Date.now() })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['k'],
    name: 'kız',
    permLevel: 0
};
