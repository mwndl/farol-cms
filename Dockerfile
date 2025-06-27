# Usa uma imagem base do Node.js
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Copia o script entrypoint para o container e libera permissão
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expõe a porta padrão do Directus (8055)
EXPOSE 8055

# Usa o script como entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
