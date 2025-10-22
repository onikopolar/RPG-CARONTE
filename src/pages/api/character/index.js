import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    if (req.method === 'GET') {
      const characters = await prisma.character.findMany({
        include: { attributes: true, skills: true }
      });
      res.status(200).json(characters);
    } else if (req.method === 'POST') {
      const { name, player, description, attributes, skills } = req.body;
      
      // Validação dos campos obrigatórios
      if (!name || !player) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios faltando: name e player são necessários' 
        });
      }

      const character = await prisma.character.create({
        data: {
          name,
          player, 
          description: description || '',
          attributes: {
            create: attributes || []
          },
          skills: {
            create: skills || []
          }
        },
        include: { attributes: true, skills: true }
      });
      
      res.status(201).json(character);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API character:', error);
    
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Personagem com este nome já existe' });
    } else if (error.name === 'PrismaClientValidationError') {
      res.status(400).json({ error: 'Dados inválidos fornecidos' });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } finally {
    await prisma.$disconnect();
  }
}
