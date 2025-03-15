import React from 'react';
import { $color_black, $color_primary, $color_white } from '@styles/colors';
import { View, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@contexts/NavbarReducer';

const LOADING_GIFS = [
    require('../../assets/loadingPage1.gif'),
    require('../../assets/loadingPage2.gif'),
    require('../../assets/loadingPage3.gif'),
    require('../../assets/loadingPage4.gif'),
    require('../../assets/loadingPage5.gif'),
]

const LoadingPage: React.FC = () => {
    const isPageLoading = useSelector((state: RootState) => state.isPageLoading);
    let randomNumber = Math.floor(Math.random() * 5);
    if (randomNumber === 5) {
        randomNumber--;
    }

    return (
        <View
            style={{
                display: isPageLoading ? 'flex' : 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 50,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
        >
            <Image
                style={{ width: 300, height: 300 }}
                source={LOADING_GIFS[randomNumber]}
            />
                <Text
                    style={{
                        textAlign: 'center',
                        color: $color_black,
                        fontFamily: 'Modak_400Regular',
                        fontSize: 40
                    }}
                >
                    Ładowanie...
                </Text>
        </View>
    );
};

export default LoadingPage;
