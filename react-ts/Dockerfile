# Development Dockerfile
FROM node:21-alpine

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 5173  
# Vite's default port
CMD ["serve", "-s", "dist", "-l", "5173"]