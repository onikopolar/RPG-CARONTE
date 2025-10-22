import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const character = await prisma.character.findUnique({
        where: { id: parseInt(id) },
        include: {
          attributes: true,
          skills: true,
        },
      });
      
      if (!character) {
        return res.status(404).json({ error: 'Personagem não encontrado' });
      }
      
      res.status(200).json(character);
    } else if (req.method === 'PUT') {
      const { name, player, description, attributes, skills } = req.body;
      
      // Primeiro deleta atributos e skills existentes
      await prisma.attribute.deleteMany({
        where: { characterId: parseInt(id) }
      });
      
      await prisma.skill.deleteMany({
        where: { characterId: parseInt(id) }
      });
      
      // Atualiza o personagem
      const character = await prisma.character.update({
        where: { id: parseInt(id) },
        data: {
          name,
          player,
          description,
          attributes: {
            create: attributes || []
          },
          skills: {
            create: skills || []
          }
        },
        include: {
          attributes: true,
          skills: true,
        }
      });
      
      res.status(200).json(character);
    } else if (req.method === 'DELETE') {
      // Deleta atributos e skills primeiro (devido às constraints)
      await prisma.attribute.deleteMany({
        where: { characterId: parseInt(id) }
      });
      
      await prisma.skill.deleteMany({
        where: { characterId: parseInt(id) }
      });
      
      // Deleta o personagem
      await prisma.character.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API character [id]:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
