const handler = async (m, { conn }) => {
  const start = process.hrtime.bigint();
  await conn.sendMessage(m.chat, { text: "_🏓 msg test_" });
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  await conn.msgUrl(m.chat, `_⚡ Bot Speed_ : ${ping.toFixed(2)}ms`, {
    newsletter: {
      name: 'JEEN-MD',
      jid: '120363410733859643@newsletter'
    },
    big: false
  }, global.reply_status);
};

handler.command = ["ping"];
handler.category = "info";
handler.usage = ["ping"];
export default handler;
