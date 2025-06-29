# Configurações do Farol CMS

## Configurações do Banco de Dados (PostgreSQL)

```env
# =============================================================================
# CONFIGURAÇÕES DO BANCO DE DADOS (PostgreSQL)
# =============================================================================
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=farol_cms
DB_USER=postgres
DB_PASSWORD=sua_senha_postgres
```

## Configurações do Servidor

```env
# =============================================================================
# CONFIGURAÇÕES DO SERVIDOR
# =============================================================================
PORT=8055
PUBLIC_URL=http://localhost:8055
```

## Configurações do S3 (AWS)

```env
# =============================================================================
# CONFIGURAÇÕES DO S3 (AWS)
# =============================================================================
# Configuração principal do S3
STORAGE_LOCATIONS=s3
STORAGE_S3_DRIVER=s3

# Credenciais AWS
STORAGE_S3_KEY=sua-access-key-id
STORAGE_S3_SECRET=sua-secret-access-key

# Configurações do bucket
STORAGE_S3_BUCKET=seu-bucket-name
STORAGE_S3_REGION=us-east-1

# Configurações opcionais do S3
STORAGE_S3_ENDPOINT=https://s3.amazonaws.com
STORAGE_S3_ACL=public-read
STORAGE_S3_FORCE_PATH_STYLE=false
```

## Configurações Adicionais (Opcionais)

```env
# =============================================================================
# CONFIGURAÇÕES ADICIONAIS (OPCIONAIS)
# =============================================================================
# Cache
CACHE_ENABLED=true
CACHE_STORE=redis
REDIS=redis://localhost:6379

# Rate Limiting
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=25
RATE_LIMITER_DURATION=1

# Logs
LOG_LEVEL=info
LOG_STYLE=raw
```

## Próximos passos

1. Crie o arquivo `.env` com as configurações acima
2. Configure seu bucket S3
3. Execute o projeto: `npm run dev` ou `docker-compose up` 