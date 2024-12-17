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

interface LessonCancelationModalProps {
    lesson: LessonDTO;
    cb: () => void;
}

export const LessonCancelationModal: React.FC<LessonCancelationModalProps> = ({
    lesson,
    cb,
}) => {
    const [isSending, setIsSending] = useState(false);
    const { setIsOpen } = useModalContext();
    const { showAlert } = useAlert();

    const handleLessonCancelation = async (
        isSeriesCancelation?: boolean,
    ): Promise<void> => {
        showAlert({
            message: 'Anulowanie zajęć...',
            severity: 'info',
        });
        try {
            if (isSeriesCancelation) {
                await lessonsService.cancelSeries(lesson.id);
            } else {
                await lessonsService.cancel(lesson.id);
            }
            showAlert({
                message: 'Anulowano.',
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
                        handleLessonCancelation();
                        setIsOpen(false);
                    }}
                    label="Odwołaj tą lekcje"
                    severity="error"
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
                            handleLessonCancelation(true);
                            setIsOpen(false);
                        }}
                        label="Odwołaj wszystkie zajęcia w serii"
                        severity="error"
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
