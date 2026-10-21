let control = async (m, { command, text, conn, bot, participants }) => {
    try {
        const isBotOwner = (userId) => {
            if (!bot.config || !bot.config.owners) return false;
            return bot.config.owners.some(owner => 
                owner.jid === userId || owner.lid === userId
            );
        };

        const getUser = () => {
            if (m.quoted) return m.quoted.sender;
            if (m.mentionedJid && m.mentionedJid.length > 0) return m.mentionedJid[0];
            if (text) return text + "@s.whatsapp.net";
            return null;
        };

        if (command === "add") {
            if (!text) return m.reply("❌ Where is the number?");
            if (m.quoted) {
                await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], 'add');
                return m.reply("*✅ Added successfully*");
            }
            if (m.mentionedJid && m.mentionedJid.length > 0) {
                await conn.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], 'add');
                return m.reply("*✅ Added successfully*");
            }
            await conn.groupParticipantsUpdate(m.chat, [text + "@s.whatsapp.net"], 'add');
            return m.reply("*✅ Added successfully*");
        }
        
        if (command === "kick") {
            let user = getUser();
            if (!user) return m.reply("❌ Mention or reply to the user");
            
            if (isBotOwner(user) || user === conn.user.id) {
                m.reply("Are you kidding me?");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            return m.reply("✅ Kicked successfully");
        }
        
        if (command === "promote") {
            let user = getUser();
            if (!user) return m.reply("❌ Mention or reply to the user");
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            return m.reply("✅ Promoted to admin");
        }
        
        if (command === "demote") {
            let user = getUser();
            if (!user) return m.reply("❌ Mention or reply to the user");
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            return m.reply("✅ Demoted successfully");
        }
        
    } catch (error) {
        await m.reply("❌ " + error.message);
    }
};

control.usage = ['add', 'kick', 'promote', 'demote'];
control.command = ['add', 'kick', 'promote', 'demote'];
control.admin = true;
control.botAdmin = true;
control.category = "admin";
export default control;
