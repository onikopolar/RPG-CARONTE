// Script para encontrar e corrigir o formulário
const fs = require('fs');

const content = fs.readFileSync('src/pages/dashboard/index.jsx', 'utf8');

// Encontrar onde está a função de criação de personagem
if (content.includes('fetch') && content.includes('/api/character')) {
  console.log('✅ Encontrei a função de criação de personagem');
  
  // Procurar pelo objeto de dados sendo enviado
  const match = content.match(/fetch.*?\/api\/character.*?{.*?body:\s*JSON\.stringify\(({[^}]*})\)/s);
  if (match) {
    console.log('📦 Dados sendo enviados:', match[1]);
  }
} else {
  console.log('❌ Não encontrei a função de criação de personagem');
}
