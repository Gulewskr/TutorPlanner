import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TileProps {
    children: React.ReactNode;
    color?: string;
}

const colorsMap: { [key: string]: any } = {
    white: '#FFFCE3',
    grey: '#D9D9D9',
    red: '#FF6B6B',
    blue: '#989CFF',
    yellow: '#E9DF84',
    orange: '#F19C6D',
    purple: '#C76DF1',
    pink: '#F16DDC',
    brightBlue: '#6DD9F1',
    green: '#6DF1A2',
    brightPink: '#FFA9F1',
};

const CustomTile: React.FC<TileProps> = ({ children, color }) => {
    const [width, setWidth] = useState(0);

    const getRandomColorKey = (map: { [key: string]: string }) => {
        const keys = Object.keys(map);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    };

    // Determine the selected color
    const selectedColor =
        color && colorsMap[color]
            ? colorsMap[color]
            : colorsMap[getRandomColorKey(colorsMap)];

    return (
        <View
            style={{
                position: 'relative',
                width: 320,
            }}
            onLayout={event => {
                const { width } = event.nativeEvent.layout;
                setWidth(width);
            }}
        >
            <View style={[styles.content, { backgroundColor: selectedColor }]}>
                <Text style={styles.text}>{children}</Text>
            </View>

            <View style={[styles.shadow, { width }]}></View>
        </View>
    );
};

CustomTile.displayName = 'CustomTile';

export default CustomTile;

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
    },

    text: {},

    shadow: {
        borderRadius: 10,
        height: 40,
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: '#9E0042',
        borderWidth: 1,
        borderColor: '#070707',
        zIndex: -1,
    },
});
