const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando população do banco...')
  
  // Criar atributos básicos de RPG
  const attributes = await prisma.attribute.createMany({
    data: [
      { name: 'Força', description: 'Poder físico e capacidade de carga' },
      { name: 'Destreza', description: 'Agilidade, reflexos e coordenação' },
      { name: 'Constituição', description: 'Vigor, saúde e resistência' },
      { name: 'Inteligência', description: 'Raciocínio, conhecimento e memória' },
      { name: 'Sabedoria', description: 'Percepção, intuição e discernimento' },
      { name: 'Carisma', description: 'Persuasão, liderança e presença' },
      { name: 'Vida', description: 'Pontos de vida' },
      { name: 'Mana', description: 'Pontos de mana' },
      { name: 'Sanidade', description: 'Estabilidade mental' },
    ],
    skipDuplicates: true,
  })
  
  console.log(`✅ ${attributes.count} atributos criados!`)
  console.log('🎉 População do banco concluída!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
