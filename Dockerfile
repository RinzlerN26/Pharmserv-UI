# Development 

FROM node:22 AS development

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

# Production 

# FROM node:22 AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM node:22

# WORKDIR /app

# VOLUME ["/build-output"]

# COPY --from=builder /app/dist/pharmserv-ui/browser /build-output

# CMD sh -c "echo 'Build done. Sleeping...' && tail -f /dev/null"