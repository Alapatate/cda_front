# Step 1: build the app
FROM node:latest AS dist
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: run with Nginx
FROM nginx:latest
COPY --from=dist /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
