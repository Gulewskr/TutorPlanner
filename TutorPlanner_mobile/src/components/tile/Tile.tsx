import React, { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    onClick?: () => void;
    height?: number;
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
    centered = false,
    onClick,
    height,
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
            style={[
                {
                    position: 'relative',
                    width: '100%',
                    backgroundColor: 'transparent',
                    minHeight: 40,
                    paddingRight: 5,
                },
            ]}
        >
            <Pressable
                onPress={onClick}
                style={[
                    styles.content,
                    {
                        backgroundColor: selectedColor,
                    },
                ]}
            >
                <View
                    style={[
                        styles.children,
                        { justifyContent: centered ? 'center' : 'flex-start' },
                        { alignItems: centered ? 'center' : 'flex-start' },
                    ]}
                >
                    {children}
                </View>
            </Pressable>
            {hasShadow && <View style={styles.shadow}></View>}
        </View>
    );
};

CustomTile.displayName = 'CustomTile';

export default CustomTile;

const styles = EStyleSheet.create({
    children: {
        width: '100%',
        minHeight: 40,
        backgroundColor: 'transparent',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 40,
        borderWidth: 1,
        borderColor: '$color_black',
        borderRadius: 10,
        backgroundColor: '$color_white',
        paddingHorizontal: 10,
    },

    shadow: {
        borderRadius: 10,
        minHeight: 40,
        height: '100%',
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: '$shadow_color_primary',
        borderWidth: 1,
        width: '100%',
        borderColor: '$color_black',
        zIndex: -1,
    },
});
