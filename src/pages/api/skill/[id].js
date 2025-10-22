import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const skill = await prisma.skill.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!skill) {
        return res.status(404).json({ error: 'Perícia não encontrada' });
      }
      
      res.status(200).json(skill);
    } else if (req.method === 'PUT') {
      const { name, value, attribute } = req.body;
      
      const skill = await prisma.skill.update({
        where: { id: parseInt(id) },
        data: {
          name,
          value: parseInt(value),
          attribute
        }
      });
      
      res.status(200).json(skill);
    } else if (req.method === 'DELETE') {
      await prisma.skill.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API skill [id]:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
