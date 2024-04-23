FROM ghcr.io/puppeteer/puppeteer:22.7.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=usr/bin/google-chrome-stable
    
WORKDIR /usr/bin/app

COPY package*.json ./

RUN npm ci 

COPY . .

CMD ["node","index.js"]

