import { Server, Cloud, Clock, Shield, Zap, ExternalLink, Terminal, Check } from 'lucide-react';

export default function DeployGuide() {
  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Постоянная работа</h1>
        <p className="text-sm text-gray-400">Настройка 24/7 хостинга бота</p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Option 1: Railway */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Railway</h3>
              <span className="text-xs text-emerald-400">⭐ Рекомендуется</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Простой деплой с бесплатным тарифом. Автоматический рестарт.
          </p>
          <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
            <p className="text-gray-500"># 1. Установи Railway CLI</p>
            <p>npm i -g @railway/cli</p>
            <p className="text-gray-500 mt-2"># 2. Авторизуйся</p>
            <p>railway login</p>
            <p className="text-gray-500 mt-2"># 3. Создай проект</p>
            <p>railway init</p>
            <p className="text-gray-500 mt-2"># 4. Установи переменные окружения</p>
            <p>railway variables set BOT_TOKEN=xxx ADMIN_ID=xxx CHANNEL_ID=xxx</p>
            <p className="text-gray-500 mt-2"># 5. Деплой</p>
            <p>railway up</p>
          </div>
          <a href="https://railway.app" target="_blank" rel="noopener noreferrer" 
             className="mt-3 inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
            <ExternalLink className="w-3 h-3" /> railway.app
          </a>
        </div>

        {/* Option 2: VPS + PM2 */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">VPS + PM2</h3>
              <span className="text-xs text-amber-400">Полный контроль</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Арендуй VPS (от $3/мес) и запусти бота через PM2 для авто-рестарта.
          </p>
          <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
            <p className="text-gray-500"># Установка PM2</p>
            <p>npm i -g pm2</p>
            <p className="text-gray-500 mt-2"># Запуск бота</p>
            <p>pm2 start bot.py --interpreter python3</p>
            <p className="text-gray-500 mt-2"># Авто-запуск при перезагрузке</p>
            <p>pm2 startup</p>
            <p>pm2 save</p>
            <p className="text-gray-500 mt-2"># Мониторинг</p>
            <p>pm2 status</p>
            <p>pm2 logs</p>
          </div>
        </div>

        {/* Option 3: Render */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Render.com</h3>
              <span className="text-xs text-gray-400">Бесплатно</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Подключи GitHub репозиторий. Бесплатный тариф с автодеплоем.
          </p>
          <div className="bg-gray-900/50 rounded-lg p-3 text-xs text-gray-300 space-y-2">
            <p>1. Загрузи проект на GitHub</p>
            <p>2. Зайди на render.com → New → Background Worker</p>
            <p>3. Подключи репозиторий</p>
            <p>4. Укажи команду: <code className="text-purple-300">python3 bot.py</code></p>
            <p>5. Добавь переменные окружения</p>
          </div>
          <a href="https://render.com" target="_blank" rel="noopener noreferrer" 
             className="mt-3 inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
            <ExternalLink className="w-3 h-3" /> render.com
          </a>
        </div>

        {/* Option 4: Systemd */}
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Systemd Service</h3>
              <span className="text-xs text-gray-400">Linux-native</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Создай systemd-сервис для автозапуска на Linux-сервере.
          </p>
          <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
            <p className="text-gray-500"># /etc/systemd/system/timurbots.service</p>
            <p>[Unit]</p>
            <p>Description=TimurSounds Bot</p>
            <p>After=network.target</p>
            <p></p>
            <p>[Service]</p>
            <p>Type=simple</p>
            <p>User=ubuntu</p>
            <p>WorkingDirectory=/home/ubuntu/bot</p>
            <p>ExecStart=/usr/bin/python3 bot.py</p>
            <p>Restart=always</p>
            <p>RestartSec=5</p>
            <p></p>
            <p>[Install]</p>
            <p>WantedBy=multi-user.target</p>
            <p className="text-gray-500 mt-2"># Активация:</p>
            <p>sudo systemctl enable timurbots</p>
            <p>sudo systemctl start timurbots</p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-5 border border-emerald-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Чеклист для надёжной работы
        </h3>
        <div className="space-y-2">
          {[
            'Переменные окружения (BOT_TOKEN, ADMIN_ID, CHANNEL_ID)',
            'Авто-рестарт при падении (PM2/systemd)',
            'Мониторинг (pm2 logs / journalctl)',
            'Резервное копирование releases.db',
            'Webhook вместо polling (для масштабирования)',
            'Mini App URL в настройках бота',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini App Setup */}
      <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-xl p-5 border border-purple-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          Подключение Mini App
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>1. Разверни этот Mini App на хостинге (Vercel, Netlify, GitHub Pages)</p>
          <p>2. В @BotFather отправь <code className="text-purple-300 bg-gray-900/50 px-1 rounded">/newapp</code></p>
          <p>3. Выбери бота и укажи URL Mini App</p>
          <p>4. Добавь кнопку в меню бота:</p>
          <code className="block text-xs text-purple-300 bg-gray-900/50 p-2 rounded-lg mt-1">
            WebAppInfo(url="https://your-app-url.com")
          </code>
        </div>
      </div>

      {/* Webhook Code */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">🔧 Webhook для масштабирования</h3>
        <p className="text-xs text-gray-400 mb-2">Для production замени polling на webhook:</p>
        <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
          <p className="text-gray-500"># В bot.py замени:</p>
          <p className="text-red-400">- await dp.start_polling(bot)</p>
          <p className="text-gray-500 mt-1"># На webhook (FastAPI):</p>
          <p className="text-emerald-400">+ from fastapi import FastAPI</p>
          <p className="text-emerald-400">+ app = FastAPI()</p>
          <p className="text-emerald-400">+ @app.post("/webhook")</p>
          <p className="text-emerald-400">+ async def webhook(request: Request):</p>
          <p className="text-emerald-400">+     update = Update.model_validate(</p>
          <p className="text-emerald-400">+         await request.json())</p>
          <p className="text-emerald-400">+     await dp.feed_update(bot, update)</p>
        </div>
      </div>
    </div>
  );
}
