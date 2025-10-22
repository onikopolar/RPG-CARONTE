# 🎲 RPG CARONTE v0.2.0

> **LANÇAMENTO ESTÁVEL** | Sistema completo de RPG para web com integração OBS

[![Version](https://img.shields.io/badge/version-0.2.0-brightgreen)](https://github.com/onikopolar/RPG-CARONTE/releases/tag/v0.2.0)
[![Linux](https://img.shields.io/badge/Linux-Compatible-success)](https://github.com/onikopolar/RPG-CARONTE)

**Download**: [Release v0.2.0](https://github.com/onikopolar/RPG-CARONTE/releases/tag/v0.2.0)

---

### Setup Rápido
```bash
git clone https://github.com/onikopolar/RPG-CARONTE.git
cd RPG-CARONTE
npm install
npx prisma db push
node src/prisma/seed.js
npm run dev


### **3. Commitar a documentação**
```bash
git add CHANGELOG.md README.md
git commit -m "docs: add v0.2.0 documentation and changelog"
git push meufork main

# Open Source RPG

Tutorial: https://www.twitch.tv/videos/1215083891
by: jvdutrag


## Sobre
O projeto visa criar um sistema via web/navegador de RPG, semelhante e inspirado no usado pela série de RPG [Ordem Paranormal](https://ordemparanormal.com.br/), com integrações em stream, criação de personagens, painel para o mestre, etc. É almejado o público leigo: então não necessariamente você vai precisar saber programar para utilizar o sistema.

O objetivo principal é criar um app simples, porém funcional, que sirva para qualquer sistema de RPG de mesa (Tormenta, D&D, CoC, etc.). Então, este repositório atual conterá apenas a base simples, com funções básicas para suprir a necessidade da maioria dos sistemas. Se você precisar de algo extremamente específico, dê um fork no repositório e faça sua versão by yourself.

Quando o projeto estiver minimamente finalizado, um guia será disponibilizado para leigos sobre como fazer o projeto funcionar.

### Recursos
- ✔️ Ficha de personagem
- ✔️ Painel do mestre para manipular o sistema
- ✔️ Integração com o OBS (software de streaming) através de Browser Sources
- ✔️ Rolagem de dados (integrada com o OBS)
- Personalização completa da integração com o OBS
- Recursos adicionais opcionais: sanidade, mana, estamina, inventário, etc.
- Recurso adicional geral para o controle do mestre e do software

### Tecnologias sendo utilizadas
- Next.JS com SSR (Server-Side Rendering) e API REST
- Prisma como tecnologia ORM
- Banco de dados relacional MySQL
- Socket.io para comunicação em tempo real entre o servidor e o cliente
