import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '212607244917', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
  // Owner 1
    { name: "YONO", lid: "120363428598542954@lid", jid: "212698498657@s.whatsapp.net" },
  // Owner 2
    { name: "YONO", lid: "120363428598542954@lid", jid: "212698498657@s.whatsapp.net" },
  // Owner 3
    { name: "YONO", jid: "212698498657@s.whatsapp.net", lid: "120363428598542954@lid" },
  // Owner 4 
   { name: "YONO", jid: "212698498657@s.whatsapp.net", lid: "120363428598542954@lid" }
  ],
  settings: { noWelcome: true },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "𝐙𝐈𝐍𝐈𝐓𝐒𝐎⃝ۛﹾؔﹾؔۛ🌊ﮩ 𝐁𝐎𝐓", 
  nameChannel: "𝒛𝒊𝒏𝒊𝒕𝒔𝒐 𝒃𝒐𝒕 ݉͢ ⃝⚡▻͂ ", 
  idChannel: "120363225356834044@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbDd8Iw5Ejxwlvjl3l1r"
  },
  copyright: { 
    pack: 'YONO DEV', 
    author: 'YONO DEV'
  },
  images: [
    "https://files.catbox.moe/4ccukt.png",
    "https://files.catbox.moe/4ccukt.png",
    "https://files.catbox.moe/4ccukt.png"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/
