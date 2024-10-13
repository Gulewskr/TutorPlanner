import React, { useEffect, useRef } from 'react';
import {
    Modal,
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

const CustomAlert: React.FC<AlertProps> = ({
    message,
    visible,
    onClose,
    severity,
    time,
}) => {
    const animation = useRef(new Animated.Value(0)).current;

    const animationDuration = (time ?? 5) * 1000;

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
                console.log('test...');
                onClose();
                console.log('test-end...');
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose, animation]);

    const animatedWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const backgroundColor =
        severity === 'success'
            ? '#BAFCA2'
            : severity === 'danger'
              ? '#FF6B6B'
              : '#F4DDFF';
    const animatedColor = '#5E5E5E80';

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <View style={styles.messageWrapper}>
                            <View
                                style={[
                                    styles.backgroundColor,
                                    { backgroundColor },
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        styles.animatedColor,
                                        {
                                            width: animatedWidth,
                                            backgroundColor: animatedColor,
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.message}>
                                <Text style={styles.text}>{message}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
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
