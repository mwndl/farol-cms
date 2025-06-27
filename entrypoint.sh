#!/bin/sh

# Tenta inicializar o banco do zero primeiro
echo "Tentando inicializar o banco de dados..."
npx directus database install || echo "Bootstrap falhou, tentando migrações..."

# Executa as migrações
echo "Executando migrações..."
npx directus database migrate:latest || echo "Migration falhou, mas continuando..."

# Inicia o Directus
echo "Iniciando Directus..."
npx directus start 