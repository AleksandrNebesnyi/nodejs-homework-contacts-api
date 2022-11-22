FROM node

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 3000

CMD ["node","server.js"]



# docker run -d -p 4000:3000  запустити контейнер 
# без перехода в термінал контейнера на порті 4000 (3000-порт контейнера)