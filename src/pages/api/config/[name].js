import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { name } = req.query;

  try {
    if (req.method === 'GET') {
      const config = await prisma.config.findUnique({
        where: { name }
      });
      
      if (!config) {
        return res.status(404).json({ error: 'Configuração não encontrada' });
      }
      
      res.status(200).json(config);
    } else if (req.method === 'PUT') {
      const { value } = req.body;
      
      const config = await prisma.config.upsert({
        where: { name },
        update: { value },
        create: { name, value }
      });
      
      res.status(200).json(config);
    } else if (req.method === 'DELETE') {
      await prisma.config.delete({
        where: { name }
      });
      
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API config [name]:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
