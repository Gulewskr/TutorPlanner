import { Button } from '@components/button';
import { Icon, ICON_NAME } from '@components/icon';
import React, { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TileProps {}

interface ActionProps {
    icon: ICON_NAME;
    action: number;
}
const CustomStudentTile: React.FC<PropsWithChildren<TileProps>> = ({
    children,
}) => {
    const actions: Array<ActionProps> = [
        { icon: 'messenger', action: 1 },
        { icon: 'oneNote', action: 2 },
        { icon: 'pencil', action: 3 },
    ];

    const handleAction = (num: number) => {
        console.log(num);
    };

    return (
        <View
            style={{
                position: 'relative',
            }}
        >
            <View style={styles.content}>
                <Text style={styles.text}>{children}</Text>
                <View style={styles.buttons}>
                    {actions.map(action => (
                        <Pressable onPress={() => handleAction(action.action)}>
                            <Icon icon={action.icon}></Icon>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={styles.shadow}></View>
        </View>
    );
};

CustomStudentTile.displayName = 'CustomStudentTile';

export default CustomStudentTile;

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        borderWidth: 1,
        width: 320,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#9E0042',
        borderWidth: 1,
        borderColor: '#070707',
        zIndex: -1,
    },
});
