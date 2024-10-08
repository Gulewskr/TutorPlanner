import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Lesson } from './EventWrapper';
import { ScrollView } from '@components/scrool-view';

export const EventTile = ({ event }: { event: Lesson }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>{event.name}</Text>
            </View>
            <View style={styles.shadow}></View>
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
        height: 45,
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
        height: 45,
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
