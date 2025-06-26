# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências globais do Directus
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta padrão do Directus (8055)
EXPOSE 8055

# Define o comando para iniciar o Directus
CMD ["npx", "directus", "start"]
