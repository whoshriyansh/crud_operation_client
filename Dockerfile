
FROM node:18-alpine AS build

WORKDIR /app


COPY package.json ./

RUN npm install


COPY . .

RUN npm run build

# Use an official Nginx image to serve the content
FROM nginx:stable-alpine

# Copy the build output to Nginx's default html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
