import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AlertSeverity } from './model';

interface AlertProps {
    message: string;
    severity: AlertSeverity;
    visible: boolean;
    onClose: () => void;
    time?: number;
}

//TODO - move colors to colors.ts
const getBgColor = (severity: AlertSeverity) => {
    switch (severity) {
        case 'danger':
            return '#FF6B6B';
        case 'success':
            return '#BAFCA2';
        case 'warning':
        case 'info':
        default:
            return '#F4DDFF';
    }
};

const CustomAlert: React.FC<AlertProps> = ({
    message,
    visible,
    onClose,
    severity,
    time,
}) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(true);

    const animationDuration = time || 3000;

    useEffect(() => {
        if (visible) {
            animation.setValue(0);

            Animated.timing(animation, {
                toValue: 1,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, []);

    const animatedWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const animatedColor = '#5E5E5E80';

    const bgColor = useMemo(() => getBgColor(severity), [severity]);

    return (
        <View
            style={{
                width: '100%',
                height: 'auto',
                minHeight: 40,
                display: isVisible ? 'flex' : 'none',
            }}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[styles.container, { backgroundColor: bgColor }]}>
                    <Animated.View
                        style={[
                            styles.animatedColor,
                            {
                                width: animatedWidth,
                                backgroundColor: animatedColor,
                            },
                        ]}
                    />
                    <View style={styles.message}>
                        <Text style={styles.text}>{message}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};
CustomAlert.displayName = 'CustomAlert';

export default CustomAlert;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '$color_black',
    },

    messageWrapper: {
        marginTop: 40,
        minWidth: 180,
        maxWidth: '80%',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 10,
    },

    backgroundColor: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 10,
    },

    animatedColor: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: 10,
        zIndex: 1,
        opacity: 0.5,
    },

    message: {
        padding: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '$color_black',
        fontSize: 12,
        textAlign: 'center',
    },
});
