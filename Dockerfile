FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]

# docker build .  команда терминала для создания образа
# docker images - команда терминала показывает все образы
#  docker run id образа- Распаковка в контейнер
#  docker stop id контейнера- остановка  контейнера
# docker ps - показывает все запущенные контейнеры
#  docker start id контейнера- запуск  контейнера

#  docker run -d id образа- Распаковка в контейнер 
# без переноса в терминал контейнера но с созданием нового контейнера

# docker run -d -p  port VPS (3000): port localserver(4000) id образа- 
# Распаковка в контейнер cуказанием порта VPS and local port