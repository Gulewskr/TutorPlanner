import { configRepository } from '../repositories/configRepository';

class ServerService {
    public async initializeServer(): Promise<void> {
        await configRepository.initializeConfig();
    }
}

export default new ServerService();
