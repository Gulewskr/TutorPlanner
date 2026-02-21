import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@components/button';
import EStyleSheet from 'react-native-extended-stylesheet';
import { $border_width } from '@styles/global';

interface Props {
    onPrev: () => void;
    title: string;
    onNext: () => void;
}

export const PageNavigation: React.FC<Props> = ({onPrev, title, onNext}) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Button
                icon="arrowLeft"
                type="icon-button"
                hasShadow={false}
                severity="warning"
                onClick={onPrev}
            />
            <View style={styles.control_text}>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            </View>
            <Button
                icon="arrowRight"
                type="icon-button"
                hasShadow={false}
                severity="warning"
                onClick={onNext}
            />
        </View>
    );
};

const styles = EStyleSheet.create({
    control_text: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 40,
        borderWidth: $border_width,
        borderColor: '$color_black',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
    },
});
