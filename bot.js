require('dotenv').config(); //  подключает библиотеку dotenv. Она берёт твои секретные данные (ключи и токены) из файла .env, чтобы их не писать прямо в коде.
// const { Configuration, OpenAIApi } = require('openai'); // подключает библиотеку от OpenAI, которая позволяет использовать ChatGPT в твоём боте.
const { Telegraf } = require('telegraf'); // подключает библиотеку Telegraf — специальную библиотеку для создания Telegram-ботов на JavaScript.
const OpenAI = require('openai');

const { TELEGRAM_TOKEN, OPENAI_API_KEY } = process.env;

const bot = new Telegraf(TELEGRAM_TOKEN); // Создаёт нового бота, используя твой токен Telegram, чтобы он мог подключиться и работать от твоего имени.

// (подключение к OpenAI )
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});


bot.hears(
  'Привет',
    'Привет, любимый', 
    'привет' ,
    'привет, любимый' ,
    'любимый' ,
    'родной' ,
    'Родной' ,
    'Солнышко' ,
    'Солнце' ,
    'солнце',
  async (ctx) => {
    try {
      await ctx.reply('Здравствуй, любимая ❤️');
    } catch (error) {
      await ctx.reply(`Любимая, к сожалению, произошла ошибка. ${error}`);
    }
  },
);

bot.hears(
  'Люблю', 'люблю',  ' я люблю тебя' ,' Я люблю тебя' , ' люблю тебя',
  async (ctx) => {
    try {
      await ctx.reply('Я люблю тебя сильнее ❤️. Ты самая лучшая и со всем справишься 💋');
    } catch (error) {
      await ctx.reply(`Любимая, к сожалению, произошла ошибка. ${error}`);
    }
  },
);

bot.on('message:text', async (ctx) => {
  // Обработка входящих сообщений
  try {
    const userMessage = ctx.message.text;
    console.log(
      `Сообщение от ${ctx.from?.username || ctx.from?.first_name}: ${userMessage}`,
    );

    const completion = await openai.createChatCompletion({
      model: 'gpt-4', // Или "gpt-4", если доступен
      messages: [{ role: 'user', content: userMessage }],
    });

    const gptReply = completion.data.choices[0]?.message?.content;

    if (gptReply) {
      await ctx.reply(gptReply);
    } else {
      await ctx.reply('GPT не дал ответа. Попробуй задать вопрос иначе.');
    }
  } catch (error) {
    console.error('Ошибка:', error.response?.data || error.message || error);
    await ctx.reply('Произошла ошибка. Попробуй позже.');
  }
});

bot.launch();
console.log('Бот запущен...');

// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));
