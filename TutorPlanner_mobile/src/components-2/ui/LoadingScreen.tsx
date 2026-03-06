import React from 'react';
import { $color_primary, $color_white } from '@styles/colors';
import { View, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@contexts/NavbarReducer';
import { useFonts, Modak_400Regular } from '@expo-google-fonts/modak';

const LoadingScreen: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.isLoading);
    const [fontsLoaded] = useFonts({
        Modak_400Regular,
    });

    if (!fontsLoaded) {
        return;
    }

    return (
        <View
            style={{
                display: isLoading ? 'flex' : 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 900,
                backgroundColor: $color_primary,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
        >
            <Image
                style={{ width: 300, height: 300 }}
                source={require('../../assets/bubu.gif')}
            />
            {fontsLoaded && (
                <Text
                    style={{
                        textAlign: 'center',
                        color: $color_white,
                        fontFamily: 'Modak_400Regular',
                        fontSize: 40
                    }}
                >
                    Ładowanie...
                </Text>
            )}
        </View>
    );
};

export default LoadingScreen;
