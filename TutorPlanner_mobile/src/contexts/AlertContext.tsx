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
    const [alertsToRemove, setAlertsToRemove] = useState<string[]>([]);

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
                <Alert
                    key={alertKey}
                    message={message}
                    time={time}
                    severity={severity || 'info'}
                    visible={true}
                    onClose={() => handleRemoveAlert(alertKey)}
                />,
                ...a,
            ];
        });
        setTimeout(() => handleRemoveAlert(alertKey), time || 3000);
    };

    const handleRemoveAlert = (alertKey: string) => {
        setAlertsToRemove(list => {
            return [...list, alertKey];
        });
    };

    useEffect(() => {
        if (alerts.length && alertsToRemove.length === alerts.length) {
            setAlerts([]);
            setAlertsToRemove([]);
            console.log('alerts cleared');
            //alerts.every(
            //    alert =>
            //        alert &&
            //        typeof alert === 'object' &&
            //        'key' in alert &&
            //        alertsToRemove.includes(alert.key || ''),
            //);
        }
    }, [alertsToRemove, alerts]);

    return (
        <AlertContext.Provider
            value={{ isVisible: true, showAlert: handleCreateAlert, alerts }}
        >
            {children}
        </AlertContext.Provider>
    );
};
