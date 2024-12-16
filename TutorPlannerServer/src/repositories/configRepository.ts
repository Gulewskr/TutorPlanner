import { prisma } from '../db';
import { ConfigDAO } from '../models/config.model';

export const configRepository = {
    getConfig: async (): Promise<ConfigDAO> => {
        return await prisma.config.findFirstOrThrow();
    },
    initializeConfig: async (): Promise<ConfigDAO> => {
        let config = await prisma.config.findFirst();
        if (!config) {
            console.log('Initializing default config...');
            config = await prisma.config.create({
                data: {
                    version: '0.0.0',
                    lastSupportedVersion: '0.0.0',
                    welcomeMessageTitle: 'Witaj, Natalcia!',
                    welcomeMessage: 'To już prawie święta 🎅🎁',
                },
            });
        }
        console.log('Current config:');
        console.log(config);
        return config;
    },
};
