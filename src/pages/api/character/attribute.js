import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { characterId } = req.query;

  try {
    if (req.method === 'GET') {
      const attributes = await prisma.attribute.findMany({
        where: { characterId: parseInt(characterId) }
      });
      res.status(200).json(attributes);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API character attribute:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
