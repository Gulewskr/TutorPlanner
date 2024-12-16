import { configRepository } from '../repositories/configRepository';
import { WelcomeMessageDTO, VersionCheckDTO } from '../models/config.model';

class ConfigService {
    public async checkVersionSupport(
        version: string,
    ): Promise<VersionCheckDTO> {
        const config = await configRepository.getConfig();
        const valid = this.isNewerVersion(version, config.lastSupportedVersion);
        const isNewestVersion = this.isNewerVersion(version, config.version);
        return {
            isSupported: valid,
            message: '-', // might be not needed
            hasUpdate: !isNewestVersion,
            newestVersion: config.version,
        };
    }

    public async getWelcomeMessage(): Promise<WelcomeMessageDTO> {
        const config = await configRepository.getConfig();
        return {
            title: config.welcomeMessageTitle,
            message: config.welcomeMessage,
        };
    }

    private isNewerVersion(
        currentVersion: string,
        maybeNewerVersion: string,
    ): boolean {
        const currVersionTable = currentVersion.split('.');
        const supportedVersionTable = maybeNewerVersion.split('.');
        for (let i = 0; i < supportedVersionTable.length; i++) {
            if (currVersionTable.length - 1 < i) {
                return false;
            }
            const comperator =
                Number(currVersionTable[i]) - Number(supportedVersionTable[i]);
            if (comperator > 0) {
                return true;
            } else if (comperator < 0) {
                return false;
            }
        }

        return true;
    }
}

export default new ConfigService();
