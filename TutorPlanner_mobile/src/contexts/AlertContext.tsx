import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Alert, AlertSeverity } from '@components/alert';

interface AlertContextProps {
    isVisible: boolean;
    showAlert: (props: {
        message: string;
        severity?: AlertSeverity;
        time?: number;
    }) => void;
    alerts: React.ReactNode[];
}

const defaultModalContext: AlertContextProps = {
    isVisible: false,
    showAlert: () => {},
    alerts: [],
};

const AlertContext: React.Context<AlertContextProps> =
    createContext(defaultModalContext);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: React.PropsWithChildren) => {
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
        const alertKey = message + (Math.random() * 10000).toFixed();
        setAlerts(a => {
            return [
                ...a,
                <Alert
                    key={alertKey}
                    message={message}
                    time={time}
                    severity={severity || 'info'}
                    visible={true}
                    onClose={() => handleRemoveAlert(alertKey)}
                />,
            ];
        });
        setTimeout(() => handleRemoveAlert(alertKey), time || 3000);
    };

    const handleRemoveAlert = (alertKey: string) => {
        setAlerts(t => t.slice(1));
    };

    return (
        <AlertContext.Provider
            value={{ isVisible: true, showAlert: handleCreateAlert, alerts }}
        >
            {children}
        </AlertContext.Provider>
    );
};
