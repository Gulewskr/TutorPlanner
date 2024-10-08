import React, { useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Lesson } from './EventWrapper';

export const EventTile = ({ event }: { event: Lesson }) => {
    const [height, setHeight] = useState(0);

    return (
        <View style={styles.container}>
            <View
                style={styles.content}
                onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    setHeight(height);
                }}
            >
                <Text style={styles.text}>
                    {event.name}
                    {'\n'}
                    {event.startHour}-{event.endHour}
                </Text>
            </View>
            <View style={[styles.shadow, { height: height }]}></View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 45,
        paddingVertical: 5,
        borderWidth: 1,
        width: 320,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
        zIndex: 0,
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    text: {},

    buttons: {
        flexDirection: 'row',
        gap: 10,
    },

    shadow: {
        borderRadius: 10,
        minHeight: 45,
        position: 'absolute',
        top: 4,
        left: 4,
        width: 320,
        backgroundColor: '$shadow_color_primary',
        borderWidth: 1,
        borderColor: '$color_black',
        zIndex: -1,
    },
});
