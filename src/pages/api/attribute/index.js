import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  try {
    if (req.method === 'GET') {
      const attributes = await prisma.attribute.findMany();
      res.status(200).json(attributes);
    } else if (req.method === 'POST') {
      const { name, value, characterId } = req.body;
      
      const attribute = await prisma.attribute.create({
        data: {
          name,
          value: parseInt(value),
          characterId
        }
      });
      
      res.status(201).json(attribute);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API attribute:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
