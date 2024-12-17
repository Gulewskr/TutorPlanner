import { useAlert } from '@contexts/AlertContext';
import { VersionCheckDTO } from '@model';
import { configService } from '@services/config.service';
import { useEffect, useState } from 'react';

export const useConfig = () => {
    const { showAlert } = useAlert();
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
        try {
            const response = await configService.getWelcomeMessage();
            const validationCheckDTO = await configService.versionValidation();
            setVersionCheck(validationCheckDTO);
            setWelcomeMessage(response);
        } catch (e) {
            showAlert({
                message: 'Oj coś nie działa 🤒',
                severity: 'warning',
            });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return { versionCheck, welcomeMessage, isLoading };
};
