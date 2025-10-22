import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  try {
    if (req.method === 'GET') {
      const skills = await prisma.skill.findMany();
      res.status(200).json(skills);
    } else if (req.method === 'POST') {
      const { name, value, characterId, attribute } = req.body;
      
      const skill = await prisma.skill.create({
        data: {
          name,
          value: parseInt(value),
          attribute,
          characterId
        }
      });
      
      res.status(201).json(skill);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API skill:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
