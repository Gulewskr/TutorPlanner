import { $color_primary, $color_secondary } from '@styles/colors';
import { $border_width } from '@styles/global';
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
    | 'primary'
    | 'secondary';

interface TileProps {
    color?: TileColors;
    customColor?: string;
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
    primary: $color_primary,
    secondary: $color_secondary,
};

const CustomTile: React.FC<PropsWithChildren<TileProps>> = ({
    children,
    color = 'white',
    customColor,
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
        customColor ||
        (color && TILE_COLORS[color]
            ? TILE_COLORS[color]
            : getRandomColorKey());

    return (
        <View
            style={[
                {
                    position: 'relative',
                    width: '100%',
                    backgroundColor: 'transparent',
                    minHeight: height || 40,
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
                        flex: 1,
                    },
                ]}
            >
                <View
                    style={[
                        styles.children,
                        {
                            justifyContent: 'center',
                            alignItems: centered ? 'center' : 'flex-start',
                            minHeight: height || 40,
                        },
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
        backgroundColor: 'transparent',
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 40,
        borderWidth: $border_width,
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
        borderWidth: $border_width,
        width: '100%',
        borderColor: '$color_black',
        zIndex: -1,
    },
});
