import { Config } from '@prisma/client';

type ConfigDAO = Config;

type WelcomeMessageDTO = {
    title: string;
    message: string;
};

type VersionCheckDTO = {
    isSupported: boolean;
    message: string;
    hasUpdate: boolean;
    newestVersion: string;
};

export type { ConfigDAO, WelcomeMessageDTO, VersionCheckDTO };
export { Config };
