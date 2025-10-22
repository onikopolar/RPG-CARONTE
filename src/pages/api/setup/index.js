import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const prisma = new PrismaClient();
        
        try {
            const configs = [
                {
                    name: 'DICE_ON_SCREEN_TIMEOUT_IN_MS',
                    value: '5000'
                },
                {
                    name: 'TIME_BETWEEN_DICES_IN_MS',
                    value: '2000'
                }
            ]
            
            await prisma.config.createMany({
                data: configs
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Setup error:', error);
            return res.status(500).json({ error: 'Setup failed' });
        } finally {
            await prisma.$disconnect();
        }
    }
    else {
        return res.status(404).json({ error: 'Method not allowed' });
    }
}
