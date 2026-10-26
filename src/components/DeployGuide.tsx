import { Server, Cloud, Clock, Shield, Zap, ExternalLink, Terminal, Check, Star, AlertTriangle, Crown } from 'lucide-react';
import { useState } from 'react';

export default function DeployGuide() {
  const [expandedOption, setExpandedOption] = useState<string | null>('oracle');

  const toggleOption = (id: string) => {
    setExpandedOption(expandedOption === id ? null : id);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Бесплатный хостинг</h1>
        <p className="text-sm text-gray-400">Лучшие варианты для 24/7 работы бота</p>
      </div>

      {/* Top Recommendation */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600/20 via-orange-600/10 to-red-600/20 p-5 border border-amber-700/30">
        <div className="absolute top-2 right-3">
          <Crown className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Лучший бесплатный вариант</span>
        </div>
        <h2 className="text-lg font-bold text-white">Oracle Cloud — навсегда бесплатно</h2>
        <p className="text-sm text-gray-300 mt-1">
          Полноценный VPS с 24GB RAM, 4 CPU, 200GB SSD — бесплатно навсегда. Идеально для Telegram-бота.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">24 GB</p>
            <p className="text-[10px] text-gray-400">RAM</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">4 CPU</p>
            <p className="text-[10px] text-gray-400">ARM Ampere</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">200 GB</p>
            <p className="text-[10px] text-gray-400">SSD</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">

        {/* Oracle Cloud */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <button
            onClick={() => toggleOption('oracle')}
            className="w-full flex items-center gap-3 p-4 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <Server className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Oracle Cloud Free Tier</h3>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-full font-bold">НАВСЕГДА</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Полноценный VPS бесплатно • 24GB RAM • 4 CPU</p>
            </div>
          </button>
          {expandedOption === 'oracle' && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-300 mb-2">
                  <strong className="text-white">Что получаешь бесплатно:</strong>
                </p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• До 4 ARM Ampere A1 cores (24 GB RAM суммарно)</li>
                  <li>• 2 x86 микро-инстанса (1 GB RAM каждый)</li>
                  <li>• 200 GB Block Volume (SSD)</li>
                  <li>• 10 TB исходящего трафика/мес</li>
                  <li>• Публичный IP-адрес</li>
                  <li>• Полный root-доступ (Ubuntu/Oracle Linux)</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-emerald-400 font-medium mb-1">✅ Плюсы:</p>
                <ul className="space-y-0.5 text-xs text-gray-400">
                  <li>• Полноценный Linux-сервер навсегда</li>
                  <li>• Можно ставить что угодно (Python, PM2, Docker)</li>
                  <li>• Нет ограничений по времени работы</li>
                  <li>• Подходит для polling и webhook</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-amber-400 font-medium mb-1">⚠️ Минусы:</p>
                <ul className="space-y-0.5 text-xs text-gray-400">
                  <li>• Нужна банковская карта для верификации (списывают и возвращают ~$1)</li>
                  <li>• Иногда сложно зарегистрироваться (могут отказать)</li>
                  <li>• Нужно уметь работать с Linux</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                <p className="text-emerald-400 font-sans font-medium text-xs mb-2">📋 Быстрый старт после регистрации:</p>
                <p className="text-gray-500"># Подключись к серверу по SSH</p>
                <p>ssh ubuntu@YOUR_IP</p>
                <p className="text-gray-500 mt-2"># Установи Python и зависимости</p>
                <p>sudo apt update && sudo apt install python3 python3-pip -y</p>
                <p className="text-gray-500 mt-2"># Скопируй бота (через git или scp)</p>
                <p>git clone https://github.com/Hyperion612/Bot_Admin_TimurSounds</p>
                <p>cd Bot_Admin_TimurSounds</p>
                <p>pip3 install -r requirements.txt</p>
                <p className="text-gray-500 mt-2"># Настрой переменные окружения</p>
                <p>echo 'BOT_TOKEN=xxx' {'>'} .env</p>
                <p>echo 'ADMIN_ID=xxx' {'>>'} .env</p>
                <p>echo 'CHANNEL_ID=xxx' {'>>'} .env</p>
                <p className="text-gray-500 mt-2"># Установи PM2 для авто-рестарта</p>
                <p>sudo apt install nodejs npm -y</p>
                <p>sudo npm i -g pm2</p>
                <p>pm2 start bot.py --interpreter python3 --name timursounds</p>
                <p>pm2 startup</p>
                <p>pm2 save</p>
              </div>
              <a href="https://www.oracle.com/cloud/free/" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Зарегистрироваться на Oracle Cloud
              </a>
            </div>
          )}
        </div>

        {/* Amvera */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <button
            onClick={() => toggleOption('amvera')}
            className="w-full flex items-center gap-3 p-4 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Cloud className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Amvera</h3>
                <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] rounded-full font-bold">~1 МЕС БЕСПЛАТНО</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Российский PaaS • Оплата рублями • Простой деплой</p>
            </div>
          </button>
          {expandedOption === 'amvera' && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-300 mb-2">
                  <strong className="text-white">Условия:</strong>
                </p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Приветственный баланс — хватит на ~1 месяц</li>
                  <li>• Далее от 170₽/мес</li>
                  <li>• Деплой через Git или перетаскивание файлов</li>
                  <li>• Поддержка Python из коробки</li>
                  <li>• Не засыпает (в отличие от Render)</li>
                  <li>• Проксирование до Telegram API из РФ</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-emerald-400 font-medium mb-1">✅ Плюсы:</p>
                <ul className="space-y-0.5 text-xs text-gray-400">
                  <li>• Оплата российской картой</li>
                  <li>• Очень простой деплой (drag & drop)</li>
                  <li>• Серверы в Европе и США</li>
                  <li>• Не нужно настраивать Linux</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                <p className="text-emerald-400 font-sans font-medium text-xs mb-2">📋 Деплой за 2 минуты:</p>
                <p>1. Зайди на amvera.ru → зарегистрируйся</p>
                <p>2. New Project → Python</p>
                <p>3. Загрузи файлы (или привяжи GitHub)</p>
                <p>4. Добавь переменные: BOT_TOKEN, ADMIN_ID, CHANNEL_ID</p>
                <p>5. Нажми Deploy — бот работает!</p>
              </div>
              <a href="https://amvera.ru/bothosting" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Перейти на Amvera
              </a>
            </div>
          )}
        </div>

        {/* Fly.io */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <button
            onClick={() => toggleOption('flyio')}
            className="w-full flex items-center gap-3 p-4 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Fly.io</h3>
                <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded-full font-bold">FREE TIER</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Бесплатные микро-машины • Глобальная сеть • Docker</p>
            </div>
          </button>
          {expandedOption === 'flyio' && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-300 mb-2">
                  <strong className="text-white">Бесплатный тариф (Hobby):</strong>
                </p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• До 3 shared-cpu-1x машин</li>
                  <li>• 256 MB RAM на машину</li>
                  <li>• 3 GB persistent storage</li>
                  <li>• 160 GB исходящего трафика/мес</li>
                  <li>• Нужна карта для верификации</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                <p className="text-emerald-400 font-sans font-medium text-xs mb-2">📋 Деплой:</p>
                <p className="text-gray-500"># Установи flyctl</p>
                <p>curl -L https://fly.io/install.sh | sh</p>
                <p className="text-gray-500 mt-2"># Авторизуйся</p>
                <p>fly auth login</p>
                <p className="text-gray-500 mt-2"># Инициализируй проект</p>
                <p>fly launch --name timursounds-bot</p>
                <p className="text-gray-500 mt-2"># Установи секреты</p>
                <p>fly secrets set BOT_TOKEN=xxx ADMIN_ID=xxx CHANNEL_ID=xxx</p>
                <p className="text-gray-500 mt-2"># Деплой</p>
                <p>fly deploy</p>
              </div>
              <a href="https://fly.io" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Перейти на Fly.io
              </a>
            </div>
          )}
        </div>

        {/* Render */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <button
            onClick={() => toggleOption('render')}
            className="w-full flex items-center gap-3 p-4 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Render</h3>
                <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] rounded-full font-bold">ЗАСЫПАЕТ ⚠️</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Бесплатно, но бот засыпает через 15 мин • Нужен самопинг</p>
            </div>
          </button>
          {expandedOption === 'render' && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <p className="text-xs text-amber-300 font-medium">Важно!</p>
                </div>
                <p className="text-xs text-gray-400">
                  На бесплатном тарифе Render бот «засыпает» через 15 минут неактивности. 
                  При следующем сообщении стартует ~1 минуту. Для polling-бота это проблема.
                  Решение: добавь webhook + самопинг через cron-сервис (cron-job.org).
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-xs text-gray-300 mb-2">
                  <strong className="text-white">Бесплатно:</strong>
                </p>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• 750 часов/мес (1 сервис)</li>
                  <li>• 512 MB RAM</li>
                  <li>• Бесплатный PostgreSQL (90 дней)</li>
                  <li>• Деплой через GitHub</li>
                </ul>
              </div>
              <a href="https://render.com" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-xl transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Перейти на Render
              </a>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">📊 Сравнение</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-2 text-gray-400 font-medium">Сервис</th>
                  <th className="text-center py-2 text-gray-400 font-medium">Навсегда?</th>
                  <th className="text-center py-2 text-gray-400 font-medium">Сложность</th>
                  <th className="text-center py-2 text-gray-400 font-medium">Polling</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/30">
                  <td className="py-2 font-medium text-white">Oracle Cloud</td>
                  <td className="text-center"><span className="text-emerald-400">✅ Да</span></td>
                  <td className="text-center">🔧 Средняя</td>
                  <td className="text-center"><span className="text-emerald-400">✅</span></td>
                </tr>
                <tr className="border-b border-gray-700/30">
                  <td className="py-2 font-medium text-white">Amvera</td>
                  <td className="text-center"><span className="text-amber-400">~1 мес</span></td>
                  <td className="text-center">🟢 Легко</td>
                  <td className="text-center"><span className="text-emerald-400">✅</span></td>
                </tr>
                <tr className="border-b border-gray-700/30">
                  <td className="py-2 font-medium text-white">Fly.io</td>
                  <td className="text-center"><span className="text-emerald-400">✅ Да*</span></td>
                  <td className="text-center">🔧 Средняя</td>
                  <td className="text-center"><span className="text-emerald-400">✅</span></td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-white">Render</td>
                  <td className="text-center"><span className="text-emerald-400">✅ Да</span></td>
                  <td className="text-center">🟢 Легко</td>
                  <td className="text-center"><span className="text-red-400">❌</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">* Fly.io требует карту, но не списывает при укладывании в лимиты</p>
        </div>
      </div>

      {/* My Recommendation */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-5 border border-emerald-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-emerald-400" />
          Моя рекомендация для TimurSounds
        </h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex gap-3">
            <span className="text-lg">1️⃣</span>
            <div>
              <p className="font-medium text-white">Попробуй Oracle Cloud</p>
              <p className="text-xs text-gray-400 mt-0.5">Навсегда бесплатный полноценный сервер. Если получится зарегистрироваться — это лучший вариант.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">2️⃣</span>
            <div>
              <p className="font-medium text-white">Если не получилось — Amvera</p>
              <p className="text-xs text-gray-400 mt-0.5">Простейший деплой за 2 минуты, оплата рублями. Бесплатно на первый месяц.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">3️⃣</span>
            <div>
              <p className="font-medium text-white">Для Mini App — Vercel / GitHub Pages</p>
              <p className="text-xs text-gray-400 mt-0.5">Этот Mini App можно захостить бесплатно на Vercel или GitHub Pages.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PM2 Setup */}
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-purple-400" />
          PM2 — авто-рестарт бота
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Для Oracle Cloud / любого VPS. PM2 следит за ботом и перезапускает при падении.
        </p>
        <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
          <p className="text-gray-500"># Установка</p>
          <p>sudo npm i -g pm2</p>
          <p className="text-gray-500 mt-2"># Запуск бота</p>
          <p>pm2 start bot.py --interpreter python3 --name timursounds</p>
          <p className="text-gray-500 mt-2"># Автозапуск при перезагрузке сервера</p>
          <p>pm2 startup</p>
          <p>pm2 save</p>
          <p className="text-gray-500 mt-2"># Полезные команды</p>
          <p>pm2 status          <span className="text-gray-600"># статус</span></p>
          <p>pm2 logs            <span className="text-gray-600"># логи</span></p>
          <p>pm2 restart all     <span className="text-gray-600"># перезапуск</span></p>
          <p>pm2 monit           <span className="text-gray-600"># мониторинг</span></p>
        </div>
      </div>

      {/* Mini App Setup */}
      <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-xl p-5 border border-purple-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          Подключение Mini App к боту
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p><strong className="text-white">Шаг 1.</strong> Захости этот Mini App:</p>
          <div className="ml-4 space-y-1 text-xs text-gray-400">
            <p>• <strong className="text-gray-300">Vercel:</strong> vercel.com → Import Git → выбери репозиторий → Deploy</p>
            <p>• <strong className="text-gray-300">GitHub Pages:</strong> Settings → Pages → Source: GitHub Actions</p>
          </div>
          <p className="mt-2"><strong className="text-white">Шаг 2.</strong> В @BotFather:</p>
          <div className="ml-4 space-y-1 text-xs text-gray-400">
            <p>• <code className="text-purple-300 bg-gray-900/50 px-1 rounded">/newapp</code> → выбери бота</p>
            <p>• Укажи URL: <code className="text-purple-300 bg-gray-900/50 px-1 rounded">https://your-app.vercel.app</code></p>
            <p>• Задай название и описание</p>
          </div>
          <p className="mt-2"><strong className="text-white">Шаг 3.</strong> Добавь кнопку в бота:</p>
          <code className="block text-xs text-purple-300 bg-gray-900/50 p-2 rounded-lg mt-1 overflow-x-auto">
            {`from aiogram.types import WebAppInfo, InlineKeyboardButton\n\nkeyboard = InlineKeyboardMarkup(inline_keyboard=[\n    [InlineKeyboardButton(\n        text="🎵 Открыть панель",\n        web_app=WebAppInfo(url="https://your-app.vercel.app")\n    )]\n])`}
          </code>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Финальный чеклист
        </h3>
        <div className="space-y-2">
          {[
            'Переменные окружения настроены (.env)',
            'PM2 / systemd для авто-рестарта',
            'Бот работает 24/7 (проверь pm2 status)',
            'Mini App захостен и доступен по HTTPS',
            'Кнопка Mini App добавлена в бота',
            'Логи проверяются (pm2 logs)',
            'Бекап releases.db настроен',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
