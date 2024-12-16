import { CONFIG_URL } from './config';
import { axios } from './baseService';
import { WelcomeMessageDTO, VersionCheckDTO } from '@model';
import { APP_VERSION } from 'src/config';

class ConfigService {
    getWelcomeMessage = async (): Promise<WelcomeMessageDTO> => {
        const res = await axios.get(`${CONFIG_URL}/welcome-message`);
        return res.data;
    };
    versionValidation = async (): Promise<VersionCheckDTO> => {
        const res = await axios.get(
            `${CONFIG_URL}/version/check/${APP_VERSION}`,
        );
        return res.data;
    };
}

export const configService = new ConfigService();
