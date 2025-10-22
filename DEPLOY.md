# Guia de Deploy - RPG Ficha Diabólica

## 🚀 Deploy em Diferentes Plataformas

### 1. Heroku
```bash
# Adicionar buildpack
heroku buildpacks:set heroku/nodejs

# Configurar variáveis
heroku config:set DATABASE_URL="sua_url_postgres"

# Deploy
git push heroku main
2. Vercel

    Conectar repositório GitHub

    Configurar DATABASE_URL nas Environment Variables

    Deploy automático
3. Railway

    Conectar repositório

    Adicionar PostgreSQL plugin

    Configurar DATABASE_URL
docker build -t rpg-caronte .
docker run -p 3000:3000 -e DATABASE_URL="sua_url" rpg-caronte
# Com PostgreSQL
docker-compose up -d
npm run dev

# Com SQLite (apenas desenvolvimento)
npm run dev

📋 Requisitos

    Node.js 16+

    PostgreSQL ou SQLite

    Variável DATABASE_URL configurada
cat > DEPLOY.md << 'EOF'
# Guia de Deploy - RPG Ficha Diabólica

## 🚀 Deploy em Diferentes Plataformas

### 1. Heroku
```bash
# Adicionar buildpack
heroku buildpacks:set heroku/nodejs

# Configurar variáveis
heroku config:set DATABASE_URL="sua_url_postgres"

# Deploy
git push heroku main
2. Vercel

    Conectar repositório GitHub

    Configurar DATABASE_URL nas Environment Variables

    Deploy automático
3. Railway

    Conectar repositório

    Adicionar PostgreSQL plugin

    Configurar DATABASE_URL
docker build -t rpg-caronte .
docker run -p 3000:3000 -e DATABASE_URL="sua_url" rpg-caronte
# Com PostgreSQL
docker-compose up -d
npm run dev

# Com SQLite (apenas desenvolvimento)
npm run dev

📋 Requisitos

    Node.js 16+

    PostgreSQL ou SQLite

    Variável DATABASE_URL configurada


4. Docker
docker build -t rpg-caronte .
docker run -p 3000:3000 -e DATABASE_URL="sua_url" rpg-caronte
5. Desenvolvimento Local
# Com PostgreSQL
docker-compose up -d
npm run dev

# Com SQLite (apenas desenvolvimento)
npm run dev
Requisitos
    Node.js 16+

    PostgreSQL ou SQLite

    Variável DATABASE_URL configurada
Comandos Úteis
npm run build          # Build produção
npm start             # Iniciar produção
npm run db:generate   # Gerar cliente Prisma
npm run db:push       # Sincronizar schema
npm run db:studio     # Abrir Prisma Studio

