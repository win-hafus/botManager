// const express = require("express");
// const axios = require("axios");
// const path = require("path")

const TelegramBot = require('node-telegram-bot-api');


require('dotenv').config();
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

// test inline-menu




bot.onText(/\/another/, (msg) => {
  const opts = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {text: "Poshel nahui", callback_data: "N"},
          {text: "Yeah, daddy", callback_data: "Y"}
        ],
      ]
    })
  }
  bot.sendMessage(msg.chat.id, "Do been a fucking slave?", opts);
});

bot.on("callback_query", async (quar) => {
  console.log(quar);
  const chatId = quar.from.id;
  if(quar.data == "Y") {
    const namePrompt = await bot.sendMessage(chatId, "Hi, what's your name?", {
        reply_markup: {
            force_reply: true,
        },
    });
    bot.onReplyToMessage(chatId, namePrompt.message_id, async (nameMsg) => {
        const name = nameMsg.text;
        await bot.sendMessage(chatId, `Hello ${name}!`);
    });
  }
})

