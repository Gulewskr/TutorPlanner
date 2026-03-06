import { useState } from 'react';
import { Layout } from '../Layout';
import { RootStackParamList } from '@components/ui/navbar';
import { Button } from '@components/button';
import { APP_VERSION } from '../../config';
import { Text } from 'react-native';
import { studentsService } from '@services/students.service';
import { useAlert } from '@contexts/AlertContext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const Settings: React.FC<
 BottomTabScreenProps<RootStackParamList, 'Settings'>
> = ({ navigation, route }) => {
    const [isCalculating, setIsCalculating] = useState(false);
    const { showAlert } = useAlert();

    const displayError = () => {
        showAlert({
            message: 'Oj za dużo liczenia 🤕',
            severity: 'danger',
        });
    };

    const displaySuccess = () => {
        showAlert({
            message: 'Policzone 😎',
            severity: 'success',
        });
    };

    const handleBalanceRecalcualtion = async () => {
        showAlert({
            message: 'Liczę to może trochę zająć... ⌛😑',
            severity: 'info',
            time: 2000,
        });
        try {
            const responseCode =
                await studentsService.recalculateAllStudentsBalances();
            if (responseCode === 204) {
                displaySuccess();
            } else {
                displayError();
            }
        } catch (err) {
            displayError();
        }
        setIsCalculating(false);
    };
    return (
        <Layout
            navigation={navigation}
            route={'Settings'}
            title="Ustawienia"
            hasHeader
        >
            <Button
                label={
                    isCalculating
                        ? 'Liczonko...'
                        : 'Oblicz ponownie bilanse uczniów'
                }
                onClick={() => {
                    setIsCalculating(true);
                    handleBalanceRecalcualtion();
                }}
                disabled={isCalculating}
            />
            <Text>Aktualna wersja {APP_VERSION}</Text>
        </Layout>
    );
};
