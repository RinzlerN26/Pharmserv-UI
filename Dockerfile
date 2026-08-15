FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM alpine:3.20

WORKDIR /build-output

COPY --from=build /app/dist/pharmserv-ui/browser .

CMD ["sh", "-c", "echo 'Angular production build completed.' && tail -f /dev/null"]