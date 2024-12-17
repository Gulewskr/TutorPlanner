import { Button } from '@components/button';
import { StaticCheckboxTile } from '@components/checkbox';
import { Icon, ICON_NAME } from '@components/icon';
//import { CheckboxTile } from '@components/checkbox';
import { Tile } from '@components/tile';
import { useModalContext } from '@contexts/modalContext';
import { LessonDTO } from '@model';
import { mapHourValueToText } from '@utils/dateUtils';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface LessonModalProps {
    lesson: LessonDTO;
    goToStudentProfile?: () => void;
    goToEditForm: () => void;
    //Probably to remove
    onDelete?: (num: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
    lesson,
    goToStudentProfile,
    goToEditForm,
    onDelete,
}) => {
    const { setIsOpen } = useModalContext();

    const [iconName, iconText]: [ICON_NAME, string] = useMemo(() => {
        if (lesson.isCanceled) {
            return ['cancelled', 'Odwołane'];
        }
        if (lesson.isPaid) {
            return ['payments', 'Opłacone'];
        }
        return ['cancel', 'Nieopłacone'];
    }, [lesson]);

    return (
        <View style={styles.container}>
            <View style={{ bottom: 5 }}>
                <Text style={styles.label}>{lesson.name}</Text>
                <Text style={styles.message}>
                    {mapHourValueToText(lesson.startHour)} -{' '}
                    {mapHourValueToText(lesson.endHour)}
                </Text>
            </View>
            <View style={styles.double_container}>
                <View style={{ width: '40%' }}>
                    <Tile color="white">
                        <Text>{`Cena: ${lesson.price}zł`}</Text>
                    </Tile>
                </View>
                <View style={{ width: '59%' }}>
                    <Tile color="white">
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <Icon icon={iconName} />
                            <Text>{iconText}</Text>
                        </View>
                    </Tile>
                </View>
            </View>
            {goToStudentProfile && (
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        goToStudentProfile();
                    }}
                    icon="students"
                    size="small"
                    label="Profil ucznia"
                    secondary
                />
            )}
            <View style={{ marginTop: 30, width: '100%' }}>
                <Button
                    icon="pencil"
                    size="small"
                    onClick={() => {
                        setIsOpen(false);
                        goToEditForm();
                    }}
                    label="Edytuj lekcje"
                    severity="warning"
                />
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 16,
    },
    message: {
        fontSize: 12,
        textAlign: 'center',
    },
    double_container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 5,
    },
    double_button_container: {},
});
