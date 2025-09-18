FROM alpine:3.18

RUN apk add --no-cache ffmpeg nodejs npm

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY index.js ./

RUN mkdir -p /tmp/input /tmp/output

CMD ["node", "index.js"]