import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { StudentDTO } from '@model';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getFullName } from '@utils/utils';
import { Tile } from '@components/tile';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DEFAULT, STYLES } from '@styles/theme';
import { tile_bg } from '@styles/colors';

interface StudentTileProps {
    student: StudentDTO;
    onClick: () => void;
    actions: ActionProps[];
}

interface ActionProps {
    icon: ICON_NAME;
    onClick: () => void;
}

const StudentTile: React.FC<StudentTileProps> = ({
    student,
    onClick,
    actions,
}) => {
    return (
        <Pressable
            onPress={onClick}
            style={[
                {
                    flexDirection: 'row',
                    minHeight: 50,
                    boxShadow: DEFAULT.boxShadow.tile.default,
                    borderRadius: 5,
                    overflow: 'hidden',
                    backgroundColor: tile_bg,
                },
                STYLES.border,
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.text}>{getFullName(student)}</Text>
                {/*
                <View style={styles.buttons}>
                    {actions &&
                        actions.map(({ icon, onClick }, index) => (
                            <Pressable
                                key={`${index}-action`}
                                onPress={onClick}
                            >
                                <View
                                    style={{
                                        height: '100%',
                                        alignItems: 'center',
                                        width: 40,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon icon={icon}></Icon>
                                </View>
                            </Pressable>
                        ))}
                </View>
                */}
            </View>
        </Pressable>
    );
};

const styles = EStyleSheet.create({
    content: {
        width: '100%',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: DEFAULT.SPACING.M
    },

    text: {
        fontWeight: DEFAULT.fontWeight.bold
    },

    buttons: {
        flexDirection: 'row',
    },
});

export { StudentTile };
