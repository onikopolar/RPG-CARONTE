import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { characterId } = req.query;

  try {
    if (req.method === 'GET') {
      const skills = await prisma.skill.findMany({
        where: { characterId: parseInt(characterId) }
      });
      res.status(200).json(skills);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API character skill:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
