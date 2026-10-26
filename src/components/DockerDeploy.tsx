import { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DockerDeploy() {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = (text: string, fileId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileId);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const dockerfile = `# Базовый образ Python
FROM python:3.11-slim

# Установка рабочей директории
WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

# Копирование файлов зависимостей
COPY requirements.txt .

# Установка Python зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . .

# Создание директории для базы данных
RUN mkdir -p /app/data

# Переменная окружения для Python
ENV PYTHONUNBUFFERED=1

# Команда запуска бота
CMD ["python", "bot.py"]`;

  const dockerignore = `# Git
.git
.gitignore

# Python
__pycache__
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local

# Database
*.db
*.sqlite
*.sqlite3

# Logs
*.log
logs/

# Docker
docker-compose.yml
Dockerfile

# Docs
README.md
*.md`;

  const dockerCompose = `version: '3.8'

services:
  bot:
    build: .
    container_name: timursounds_bot
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      # Сохранение базы данных между перезапусками
      - bot_data:/app/data
    networks:
      - bot_network

networks:
  bot_network:
    driver: bridge

volumes:
  bot_data:
    driver: local`;

  const envExample = `# Telegram Bot Token (получи у @BotFather)
BOT_TOKEN=your_bot_token_here

# Твой Telegram User ID (получи у @userinfobot)
ADMIN_ID=your_telegram_user_id

# ID канала куда бот будет публиковать (например: -1001234567890)
CHANNEL_ID=your_channel_id_here`;

  const deploySteps = [
    {
      step: 1,
      title: 'Скачай файлы',
      description: 'Скачай все 4 файла ниже и помести их в корень проекта бота',
      files: ['Dockerfile', '.dockerignore', 'docker-compose.yml', '.env.example']
    },
    {
      step: 2,
      title: 'Создай .env файл',
      description: 'Скопируй .env.example в .env и заполни свои данные',
      command: 'cp .env.example .env'
    },
    {
      step: 3,
      title: 'Заполни .env',
      description: 'Укажи BOT_TOKEN, ADMIN_ID и CHANNEL_ID',
      command: 'nano .env'
    },
    {
      step: 4,
      title: 'Заархивируй проект',
      description: 'Создай ZIP-архив со всеми файлами (включая Dockerfile)',
      command: 'zip -r bot.zip . -x "*.git*" -x "__pycache__/*"'
    },
    {
      step: 5,
      title: 'Загрузи на Tangler Cloud',
      description: 'Загрузи ZIP-архив через панель управления',
      command: null
    }
  ];

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Деплой на Tangler Cloud</h1>
        <p className="text-sm text-gray-400">Docker-контейнеризация бота</p>
      </div>

      {/* Security Warning */}
      <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">🚨 СРОЧНО: ОТОЗОВИ СТАРЫЙ ТОКЕН!</p>
            <p className="text-xs text-gray-300 mt-1">
              Твой токен бота был опубликован в открытом виде. Любой может его использовать!
            </p>
            <div className="mt-2 bg-black/30 rounded-lg p-2.5 space-y-1.5">
              <p className="text-xs text-white font-medium">Как отозвать токен:</p>
              <p className="text-xs text-gray-400">1. Открой <span className="text-blue-400">@BotFather</span></p>
              <p className="text-xs text-gray-400">2. <code className="text-purple-300">/mybots</code> → выбери бота</p>
              <p className="text-xs text-gray-400">3. <strong>API Token</strong> → <strong>Revoke current token</strong></p>
              <p className="text-xs text-gray-400">4. Скопируй НОВЫЙ токен</p>
              <p className="text-xs text-gray-400">5. Вставь его в .env файл ниже ↓</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Info */}
      <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Ошибка: Missing Dockerfile</p>
            <p className="text-xs text-gray-400 mt-1">
              Tangler Cloud требует Dockerfile для сборки контейнера. 
              Создай файлы ниже и загрузи их в архиве.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {deploySteps.map((item) => (
          <div key={item.step} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">{item.step}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                {item.command && (
                  <code className="block mt-2 text-xs text-purple-300 bg-gray-900/50 p-2 rounded-lg font-mono">
                    {item.command}
                  </code>
                )}
                {item.files && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.files.map(file => (
                      <span key={file} className="px-2 py-0.5 bg-gray-700/50 text-xs text-gray-300 rounded">
                        {file}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Files Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Необходимые файлы</h2>

        {/* Dockerfile */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Dockerfile</span>
            </div>
            <button
              onClick={() => copyToClipboard(dockerfile, 'dockerfile')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedFile === 'dockerfile' ? (
                <><Check className="w-3 h-3 text-emerald-400" /> Скопировано</>
              ) : (
                <><Copy className="w-3 h-3" /> Копировать</>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
            {dockerfile}
          </pre>
        </div>

        {/* .dockerignore */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">.dockerignore</span>
            </div>
            <button
              onClick={() => copyToClipboard(dockerignore, 'dockerignore')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedFile === 'dockerignore' ? (
                <><Check className="w-3 h-3 text-emerald-400" /> Скопировано</>
              ) : (
                <><Copy className="w-3 h-3" /> Копировать</>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
            {dockerignore}
          </pre>
        </div>

        {/* docker-compose.yml */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">docker-compose.yml</span>
            </div>
            <button
              onClick={() => copyToClipboard(dockerCompose, 'compose')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedFile === 'compose' ? (
                <><Check className="w-3 h-3 text-emerald-400" /> Скопировано</>
              ) : (
                <><Copy className="w-3 h-3" /> Копировать</>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed max-h-48 overflow-y-auto">
            {dockerCompose}
          </pre>
        </div>

        {/* .env.example */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">.env.example</span>
            </div>
            <button
              onClick={() => copyToClipboard(envExample, 'env')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedFile === 'env' ? (
                <><Check className="w-3 h-3 text-emerald-400" /> Скопировано</>
              ) : (
                <><Copy className="w-3 h-3" /> Копировать</>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed">
            {envExample}
          </pre>
        </div>

        {/* .env (with warning) */}
        <div className="bg-gray-800/50 rounded-xl border border-red-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-red-900/20 border-b border-red-700/30">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-white">.env</span>
              <span className="px-1.5 py-0.5 bg-red-500/20 text-red-300 text-[10px] rounded-full font-bold">ЗАПОЛНИ ТОКЕН</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-amber-300 mb-2">
              ⚠️ Замени <code className="bg-gray-900/50 px-1 rounded">ВСТАВЬ_НОВЫЙ_ТОКЕН_СЮДА</code> на новый токен из @BotFather
            </p>
            <pre className="text-xs text-gray-300 font-mono overflow-x-auto leading-relaxed bg-gray-900/50 p-3 rounded-lg">
{`# Замени на НОВЫЙ токен после отзыва старого!
BOT_TOKEN=ВСТАВЬ_НОВЫЙ_ТОКЕН_СЮДА

# Твой Telegram User ID
ADMIN_ID=5813102445

# ID канала куда бот будет публиковать
CHANNEL_ID=-1004412818716`}
            </pre>
          </div>
        </div>
      </div>

      {/* Download All */}
      <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 rounded-xl p-5 border border-purple-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-purple-400" />
          Скачать все файлы
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Скачай все файлы и помести в корень проекта бота
        </p>
        <div className="space-y-2">
          <a 
            href="/bot/Dockerfile" 
            download="Dockerfile"
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors w-full justify-center"
          >
            <Download className="w-4 h-4" />
            Скачать Dockerfile
          </a>
          <a 
            href="/bot/.env" 
            download=".env"
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors w-full justify-center"
          >
            <Download className="w-4 h-4" />
            ⚠️ Скачать .env (замени токен!)
          </a>
          <a 
            href="/bot/.dockerignore" 
            download=".dockerignore"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-xl transition-colors w-full justify-center"
          >
            <Download className="w-4 h-4" />
            Скачать .dockerignore
          </a>
          <a 
            href="/bot/docker-compose.yml" 
            download="docker-compose.yml"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-xl transition-colors w-full justify-center"
          >
            <Download className="w-4 h-4" />
            Скачать docker-compose.yml
          </a>
        </div>
      </div>

      {/* Success Check */}
      <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-300">После деплоя</p>
            <p className="text-xs text-gray-400 mt-1">
              Проверь логи бота в панели Tangler Cloud. Если видишь "Бот запущен!" — всё работает!
              Для проверки напиши /start боту в Telegram.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-white mb-2">🔧 Если что-то не работает</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <p>• <strong className="text-gray-300">Ошибка "No module named 'aiogram'":</strong> проверь requirements.txt</p>
          <p>• <strong className="text-gray-300">Ошибка подключения к БД:</strong> убедись что папка data/ создана</p>
          <p>• <strong className="text-gray-300">Бот не отвечает:</strong> проверь BOT_TOKEN в .env</p>
          <p>• <strong className="text-gray-300">Ошибка публикации в канал:</strong> добавь бота в каналы как админа</p>
        </div>
      </div>

      {/* Final ZIP instruction */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-5 border border-emerald-700/30">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Финальная сборка ZIP для Tangler Cloud
        </h3>
        <div className="space-y-2 text-xs text-gray-300">
          <p className="font-medium text-white">Структура ZIP-архива должна быть:</p>
          <pre className="bg-black/30 p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto">
{`bot.zip/
├── bot.py
├── config.py
├── database.py
├── requirements.txt
├── Dockerfile          ← обязательно в корне!
├── .dockerignore
├── .env                ← с НОВЫМ токеном
└── docker-compose.yml  (опционально)`}
          </pre>
          <p className="mt-2 text-gray-400">
            <strong className="text-white">Важно:</strong> все файлы должны быть в корне архива, 
            а не в папке. При распаковке Dockerfile должен оказаться рядом с bot.py.
          </p>
          <div className="mt-3 bg-black/30 rounded-lg p-3">
            <p className="text-emerald-300 font-medium mb-1">Команда для создания ZIP (Linux/Mac):</p>
            <code className="text-xs text-gray-300 font-mono">
              zip -r bot.zip bot.py config.py database.py requirements.txt Dockerfile .dockerignore .env
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
