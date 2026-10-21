const handler = async (m, { conn, command }) => {
  if (command === "close") {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    m.reply('🔒 *Chat has been closed* 🔒');
  } else if (command === "open") {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply('🔓 *Chat has been opened* 🔓');
  }
};

handler.usage = ["close", "open"];
handler.category = "admin";
handler.command = ["close", "open"];
handler.admin = true;
handler.botAdmin = true;

export default handler;
