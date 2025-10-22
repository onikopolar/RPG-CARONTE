const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  console.log('✅ Banco de dados já está funcionando!');
  await prisma.$disconnect();
}

main();
