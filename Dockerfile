# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta padrão do Directus (8055)
EXPOSE 8055

# Executa as migrations e depois inicia o Directus
CMD npx directus database migrate:latest && npx directus start
