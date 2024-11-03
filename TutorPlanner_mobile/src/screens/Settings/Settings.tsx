import * as React from 'react';
import { Layout } from '../Layout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@components/ui/navbar';
import { Button } from '@components/button';

export const Settings: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Settings'>
> = ({ navigation, route }) => {
    return (
        <Layout
            navigation={navigation}
            route={'Settings'}
            title="Ustawienia"
            hasHeader
        >
            <Button
                label="Oblicz ponownie bilanse uczniów"
                onClick={() => {
                    //TODO
                }}
            />
        </Layout>
    );
};
