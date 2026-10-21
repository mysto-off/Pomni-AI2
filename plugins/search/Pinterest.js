async function pinterest(m, { conn, bot, text }) {
  try {
    if (!text) {
      return m.reply("_Please enter a search word 🌱_");
    }
    
    const res = await bot.Api.search.pinterestImages({ q: text });
    const arr = res.data;
    
    if (!arr || arr.length === 0) {
      return m.reply("_No results found for this search 😨_");
    }
    
    const start = Math.floor(Math.random() * (arr.length - 10));
    const selectedImages = arr.slice(start, start + 10);

    const cards = selectedImages.map((item, index) => {
      const title = item.title && item.title !== 'No title' ? item.title : `Image ~ ${index + 1}`;
      
      return {
        imageUrl: item.url,
        bodyText: `*${title}*`,
        footerText: item.owner ? `👤 ${item.owner} • Pinterest` : '📌 Pinterest',
        buttons: [
          { name: 'cta_url', params: { display_text: '🔗 View Image', url: item.pinUrl || item.url } },
          { name: 'cta_copy', params: { display_text: '📋 Copy Link', copy_code: item.url } }
        ]
      };
    });

    return await conn.sendCarousel(m.chat, {
      headerText: `📸 Search results for: [ ${text} ]`,
      globalFooterText: 'JEEN-MD',
      cards: cards,
      mentions: [m.sender],
      newsletter: {
        name: 'JEEN-MD',
        jid: '120363410733859643@newsletter'
      },
    }, reply_status);
    
  } catch (error) {
    console.error(error.message);
    m.react("❌");
    return m.reply("_❌ An error occurred while fetching images_");
  }
}

pinterest.category = "pinterest";
pinterest.usage = ["pinterest"];
pinterest.command = ["pinterest"];
export default pinterest;
