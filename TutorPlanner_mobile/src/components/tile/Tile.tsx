import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TileColors =
    | 'white'
    | 'grey'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'pink'
    | 'brightBlue'
    | 'green'
    | 'brightPink'
    | 'primary';

interface TileProps {
    color?: TileColors;
    width?: number;
    centered?: boolean;
    hasShadow?: boolean;
}

const TILE_COLORS: { [key in TileColors]: string } = {
    white: '#F5F5F5', //$color_white
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
    primary: '#FFA9F1', //$color_primary
};

const CustomTile: React.FC<PropsWithChildren<TileProps>> = ({
    children,
    color,
    hasShadow = true,
    width = 320,
    centered = false,
}) => {
    const getRandomColorKey = (): string => {
        const keys = Object.keys(TILE_COLORS);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return TILE_COLORS[keys[randomIndex] as TileColors];
    };

    const selectedColor =
        color && TILE_COLORS[color] ? TILE_COLORS[color] : getRandomColorKey();

    return (
        <View
            style={{
                position: 'relative',
            }}
            // onLayout={event => {
            //     const { width } = event.nativeEvent.layout;
            //     setWidth(width);
            // }}
        >
            <View
                style={[
                    styles.content,
                    {
                        backgroundColor: selectedColor,
                        width,
                        justifyContent: centered ? 'center' : 'flex-start',
                    },
                ]}
            >
                <Text style={styles.text}>{children}</Text>
            </View>
            {hasShadow && <View style={[styles.shadow, { width }]}></View>}
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
