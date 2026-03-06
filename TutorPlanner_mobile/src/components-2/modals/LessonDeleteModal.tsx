import { Button } from '@components/button';
import { StaticCheckboxTile } from '@components/checkbox';
import { Icon } from '@components/icon';
//import { CheckboxTile } from '@components/checkbox';
import { Tile } from '@components/tile';
import { useAlert } from '@contexts/AlertContext';
import { useModalContext } from '@contexts/modalContext';
import { LessonDTO } from '@model';
import { lessonsService } from '@services/lessons.service';
import { mapHourValueToText } from '@utils/dateUtils';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface LessonDeleteModalProps {
    lesson: LessonDTO;
    cb: () => void;
}

//TODO -> copy-paste of LessonCancelationModal
export const LessonDeleteModal: React.FC<LessonDeleteModalProps> = ({
    lesson,
    cb,
}) => {
    const [isSending, setIsSending] = useState(false);
    const { setIsOpen } = useModalContext();
    const { showAlert } = useAlert();

    const handleLessonDelete = async (
        isSeries?: boolean,
    ): Promise<void> => {
        showAlert({
            message: 'Usuwanie zajęć...',
            severity: 'info',
        });
        try {
            if (isSeries) {
                await lessonsService.deleteSeries(lesson.id);
            } else {
                await lessonsService.delete(lesson.id);
            }
            showAlert({
                message: 'Usunięto.',
                severity: 'success',
            });
        } catch (e) {
            showAlert({
                message: 'Wystąpił błąd.',
                severity: 'danger',
            });
        }
        setIsSending(false);
        cb();
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <Button
                    icon="calendar-student"
                    size="small"
                    onClick={() => {
                        setIsSending(true);
                        handleLessonDelete();
                        setIsOpen(false);
                    }}
                    label="Usuń tylko tą lekcje"
                    disabled={isSending}
                />
            </View>
            <View style={{ width: '100%' }}>
                {lesson.eventSeriesId && (
                    <Button
                        icon="series"
                        size="small"
                        onClick={() => {
                            setIsSending(true);
                            handleLessonDelete(true);
                            setIsOpen(false);
                        }}
                        label="Usuń wszystkie zajęcia z serii"
                        disabled={isSending}
                    />
                )}
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 15,
        paddingTop: 40,
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
