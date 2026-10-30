const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Настройки подключения к вашему Атерносу
const serverIP = 'mitssmp.aternos.me';
const botName = 'afk_bot';
const mcVersion = '1.21.11'; 

// --- ЗАЩИТА ОТ ЗАСЫПАНИЯ (МИНИ-ВЕБ-САЙТ) ---
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Бот Expin-стиля активен и работает!');
});
app.listen(port, () => {
  console.log(`Веб-сервер запущен на порту ${port} для UptimeRobot`);
});

// --- НАСТРОЙКА МАЙНКРАФТ БОТА ---
let bot;

function createBotInstance() {
  bot = mineflayer.createBot({
    host: serverIP,
    port: 61616,
    username: botName,
    version: mcVersion
  });

  // Автоматическая регистрация/логин при входе
  bot.on('spawn', () => {
    console.log(`${botName} успешно зашел на сервер!`);
    
    setTimeout(() => {
      // Регистрируемся (пароль можете изменить на свой)
      bot.chat('/register ExpinPass777 ExpinPass777');
      bot.chat('/login ExpinPass777');
    }, 3000);
  });

  // Автоматический перезапуск, если кикнуло или сервер перезагрузился
  bot.on('end', () => {
    console.log('Бот отключился. Перезапуск через 15 секунд...');
    setTimeout(createBotInstance, 15000);
  });

  bot.on('error', (err) => {
    console.log('Произошла ошибка бота:', err);
  });
}

// Запускаем бота в первый раз
createBotInstance();

// --- ЦИКЛ ДВИЖЕНИЯ (РАЗ В 2 МИНУТЫ) ---
setInterval(() => {
  if (!bot || !bot.entity) return;

  console.log('Выполняю анти-AFK действия (бег + прыжок)...');

  // Включаем бег вперед и прыжок
  bot.setControlState('forward', true);
  bot.setControlState('sprint', true);
  bot.setControlState('jump', true);

  // Через 1.5 секунды останавливаемся
  setTimeout(() => {
    if (!bot) return;
    bot.setControlState('forward', false);
    bot.setControlState('sprint', false);
    bot.setControlState('jump', false);
  }, 1500);

}, 2 * 60 * 1000); // 2 минуты в миллисекундах
