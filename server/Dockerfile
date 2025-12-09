FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install
COPY src ./src
COPY seed.js ./
EXPOSE 8080
CMD ["node", "src/index.js"]
