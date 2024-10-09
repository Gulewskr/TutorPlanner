import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { StudentDTO } from '@model';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getFullName } from 'src/utils/utils';
import { Tile } from '@components/tile';

interface StudentTileProps {
    student: StudentDTO;
    onClick: () => void;
}

interface ActionProps {
    icon: ICON_NAME;
    action: number;
}

const StudentTile: React.FC<StudentTileProps> = ({ student, onClick }) => {
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
                marginBottom: 10,
            }}
        >
            <Tile color="white" onClick={onClick}>
                <View style={styles.content}>
                    <Text style={styles.text}>{getFullName(student)}</Text>
                    <View style={styles.buttons}>
                        {actions.map((action, index) => (
                            <Pressable
                                key={`${index}-action`}
                                onPress={() => handleAction(action.action)}
                            >
                                <Icon icon={action.icon}></Icon>
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
        gap: 10,
    },
});

export { StudentTile };
