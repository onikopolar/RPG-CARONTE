import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  console.log('API Character chamada. Method:', req.method);

  try {
    if (req.method === 'GET') {
      const characters = await prisma.character.findMany({
        include: { attributes: true, skills: true }
      });
      res.status(200).json(characters);
    } else if (req.method === 'POST') {
      console.log('Body recebido:', JSON.stringify(req.body));
      const { name, player, description, attributes, skills } = req.body;
      
      console.log('Dados extraidos:', { name, player, description });
      
      if (!name) {
        console.log('Erro: nome nao fornecido');
        return res.status(400).json({ 
          error: 'Campo obrigatorio faltando: name e necessario' 
        });
      }

      const playerName = player || 'Jogador';
      const characterDescription = description || '';
      
      console.log('Valores finais:', { name, playerName, characterDescription });

      const character = await prisma.character.create({
        data: {
          name,
          player: playerName,
          description: characterDescription,
          attributes: {
            create: attributes || []
          },
          skills: {
            create: skills || []
          }
        },
        include: { attributes: true, skills: true }
      });
      
      console.log('Personagem criado com sucesso:', character.id);
      res.status(201).json(character);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro completo na API character:', error);
    console.error('Stack trace:', error.stack);
    
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Personagem com este nome ja existe' });
    } else if (error.name === 'PrismaClientValidationError') {
      res.status(400).json({ 
        error: 'Dados invalidos fornecidos',
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: error.message 
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
