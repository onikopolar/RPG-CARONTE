import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  
  try {
    if (req.method === 'POST') {
      const { characterId, skillName, difficulty } = req.body;
      
      // Simulação de rolagem - você pode adaptar com sua lógica real
      const rollResult = {
        success: Math.random() > 0.5,
        value: Math.floor(Math.random() * 20) + 1,
        difficulty: difficulty || 10,
        timestamp: new Date().toISOString()
      };
      
      res.status(200).json(rollResult);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Erro na API roll:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
