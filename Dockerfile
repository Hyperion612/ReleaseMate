# Этап 1: Сборка React-приложения
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка production-версии
RUN npm run build

# Этап 2: Production-сервер
FROM nginx:alpine

# Копирование nginx конфигурации
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копирование собранных файлов из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Команда запуска nginx
CMD ["nginx", "-g", "daemon off;"]
