import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  try {
    if (req.method === 'GET') {
      const configs = await prisma.config.findMany();
      res.status(200).json(configs);
    } else if (req.method === 'POST') {
      const { name, value } = req.body;
      
      const config = await prisma.config.create({
        data: {
          name,
          value
        }
      });
      
      res.status(201).json(config);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API config:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
