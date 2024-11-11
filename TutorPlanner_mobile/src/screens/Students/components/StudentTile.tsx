import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { StudentDTO } from '@model';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getFullName } from '@utils/utils';
import { Tile } from '@components/tile';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

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
        <View
            style={{
                marginBottom: 10,
            }}
        >
            <Tile color="white" onClick={onClick}>
                <View style={styles.content}>
                    <Text style={styles.text}>{getFullName(student)}</Text>
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
                </View>
            </Tile>
        </View>
    );
};

const styles = EStyleSheet.create({
    content: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    text: {},

    buttons: {
        flexDirection: 'row',
    },
});

export { StudentTile };
