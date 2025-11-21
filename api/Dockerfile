FROM node:20-alpine
WORKDIR /usr/src/app

# 1. Menyalin dependencies
COPY package*.json ./ 

# 2. Menginstal dependencies
RUN npm install --legacy-peer-deps

# 3. Menyalin sisa kode (termasuk mahasiswa.js yang sudah di root)
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]