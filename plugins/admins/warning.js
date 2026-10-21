const handler = async (m, { conn }) => {
  let targetLid = m.mentionedJid?.[0] || m.quoted?.sender;
  let targetJid = m.lid2jid(targetLid);

  if (!targetJid || !targetLid) return m.reply('⚠️ *Please mention the user or reply to their message* ⚠️');

  const user = (await conn.groupMetadata(m.chat)).participants.find(
    p => p.id === targetLid || p.phoneNumber === targetJid
  );

  if (!user) return m.reply("❌ User not found in the group");

  db.groups[m.chat] ??= {};
  db.groups[m.chat].warnings ??= {};

  const id = user.phoneNumber;
  const jid = targetLid;

  const warnCount = db.groups[m.chat].warnings[id] =
    (db.groups[m.chat].warnings[id] || 0) + 1;

  await conn.sendMessage(m.chat, {
    text: `⚠️ Warning issued

👤: @${id.split("@")[0]}
📊 Warnings count: ${warnCount}`,
    mentions: [jid]
  }, { quoted: global.reply_status });
};

handler.before = async (m, { conn }) => {
  const g = global.db?.groups?.[m.chat];
  if (!g?.warnings) return false;

  const user = m.sender;

  if (!g.warnings[user]) return false;

  if (g.warnings[user] >= 3) {
    await conn.sendMessage(m.chat, {
      text: `🚫 @${user.split("@")[0]} You have violated the rules, you will now be kicked`,
      mentions: [user]
    }, { quoted: global.reply_status });

    await conn.groupParticipantsUpdate(m.chat, [user], "remove");
    delete g.warnings[user];
  }

  return false;
};

handler.command = ["warn", "warning"];
handler.usage = ['warn'];
handler.category = "admin";
handler.admin = true;
handler.botAdmin = true

export default handler;
