import React, { createContext, useContext, useMemo, useState } from 'react';
import { ModalRenderer } from './modalContext/ModalRenderer';
import { Alert, AlertSeverity } from '@components/alert';
import { View } from 'react-native';

interface AlertContextProps {
    isVisible: boolean;
    showAlert: (props: {
        message: string;
        severity?: AlertSeverity;
        time?: number;
    }) => void;
}

const defaultModalContext: AlertContextProps = {
    isVisible: false,
    showAlert: () => {},
};

const AlertContext: React.Context<AlertContextProps> =
    createContext(defaultModalContext);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: React.PropsWithChildren) => {
    const [isVisible, setIsVisible] = useState(false);
    const [alerts, setAlerts] = useState<React.ReactNode[]>([]);

    const handleCreateAlert = ({
        message,
        severity,
        time,
    }: {
        message: string;
        severity?: AlertSeverity;
        time?: number;
    }) => {
        console.log('creating alert...');
        setAlerts(a => {
            a.push(
                <Alert
                    key={message}
                    message={message}
                    time={time}
                    severity={severity || 'info'}
                    visible={true}
                    onClose={() => handleRemoveAlert(message)}
                />,
            );
            return a;
        });
    };

    const handleRemoveAlert = (alertKey: string) => {
        setAlerts(a => {
            console.log('deleting...');
            const index = a.findIndex(
                v =>
                    v &&
                    typeof v === 'object' &&
                    'key' in v &&
                    v.key === alertKey,
            );
            console.log(index);
            console.log(a);
            a.splice(index, 1);
            console.log(a);
            return a;
        });
    };

    return (
        <AlertContext.Provider
            value={{ isVisible, showAlert: handleCreateAlert }}
        >
            <>{alerts && alerts.map(alert => alert)}</>
            {children}
        </AlertContext.Provider>
    );
};
