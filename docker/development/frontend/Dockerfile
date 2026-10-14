FROM node:24

WORKDIR /app

COPY src/frontend/package*.json ./

RUN npm ci

COPY src/frontend .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]