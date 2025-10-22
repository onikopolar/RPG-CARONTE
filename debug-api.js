const { PrismaClient } = require('@prisma/client');

async function testAPI() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testando criacao de personagem sem player...');
    
    // Simular exatamente o que a API recebe
    const testData = {
      name: 'Teste-SEM-Player',
      description: 'Teste sem campo player'
    };
    
    console.log('Dados de teste:', testData);
    
    const result = await prisma.character.create({
      data: {
        name: testData.name,
        player: testData.player || 'Jogador', // mesma logica da API
        description: testData.description || '',
        attributes: {
          create: []
        },
        skills: {
          create: []
        }
      }
    });
    
    console.log('SUCESSO: Personagem criado:', result);
    
  } catch (error) {
    console.error('ERRO DETALHADO:');
    console.error('Mensagem:', error.message);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);
    
    if (error.meta) {
      console.error('Meta:', error.meta);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
