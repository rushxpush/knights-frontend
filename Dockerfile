FROM node:lts-alpine AS build

# build arguments for Vite mode
ARG VITE_MODE=development
ENV VITE_MODE=$VITE_MODE

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --mode=$VITE_MODE

FROM node:lts-alpine AS runtime

COPY --from=build /app/dist /app/dist

EXPOSE 8080

CMD ["http-server", "dist"]