import { VersionCheckDTO } from '@model';
import { configService } from '@services/config.service';
import { useEffect, useState } from 'react';

export const useConfig = () => {
    const [welcomeMessage, setWelcomeMessage] = useState<{
        title: string;
        message: string;
    }>({
        title: 'Witaj, Natalcia!',
        message: 'Dziś jest wspaniały dzień do działania :)',
    });
    const [versionCheck, setVersionCheck] = useState<VersionCheckDTO>();
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        const response = await configService.getWelcomeMessage();
        const validationCheckDTO = await configService.versionValidation();
        setVersionCheck(validationCheckDTO);
        setWelcomeMessage(response);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return { versionCheck, welcomeMessage, isLoading };
};
