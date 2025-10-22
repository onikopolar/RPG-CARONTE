import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const attribute = await prisma.attribute.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!attribute) {
        return res.status(404).json({ error: 'Atributo não encontrado' });
      }
      
      res.status(200).json(attribute);
    } else if (req.method === 'PUT') {
      const { name, value } = req.body;
      
      const attribute = await prisma.attribute.update({
        where: { id: parseInt(id) },
        data: {
          name,
          value: parseInt(value)
        }
      });
      
      res.status(200).json(attribute);
    } else if (req.method === 'DELETE') {
      await prisma.attribute.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API attribute [id]:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
