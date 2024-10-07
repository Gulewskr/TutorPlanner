import React from 'react';
import { Icon, ICON_NAME } from '@components/icon';
import { StudentDTO } from '@model';
import { Pressable, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getFullName } from 'src/utils/utils';

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
                position: 'relative',
            }}
        >
            <Pressable onPress={onClick}>
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
                <View style={styles.shadow}></View>
            </Pressable>
        </View>
    );
};

const styles = EStyleSheet.create({
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

export { StudentTile };
