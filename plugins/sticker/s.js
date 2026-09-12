import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, bot }) => {
  if (!m.quoted) return m.reply("_🛘 Please send or reply to an image/video/sticker to convert it into a stickerv_");
  
const { pack, author } = bot.config.info.copyright
const q = await m.quoted;
const buffer = await createSticker(await q.download(), { mime: q.mimetype, pack, author })

await conn.sendMessage(
  m.chat,
  { sticker: buffer },
  { quoted: reply_status }
);
};

test.usage = ["ملصق"];
test.command = ["ملصق", "s"];
test.category = "sticker";
export default test;
