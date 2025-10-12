import { Button } from '@components/button';
import { Icon, ICON_NAME } from '@components/icon';
import { Tile } from '@components/tile';
import { useAlert } from '@contexts/AlertContext';
import { useModalContext } from '@contexts/modalContext';
import { LessonDTO } from '@model';
import { lessonsService } from '@services/lessons.service';
import { mapHourValueToText } from '@utils/dateUtils';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LessonDeleteModal } from './LessonDeleteModal';
import { useConfirmModal } from '@contexts/confirmModalContext';

interface LessonModalProps {
    lesson: LessonDTO;
    goToStudentProfile?: () => void;
    goToEditForm: () => void;
    onChange?: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
    lesson,
    goToStudentProfile,
    goToEditForm,
    onChange,
}) => {
    const { showAlert } = useAlert();
    const { setIsOpen, setModalBody } = useModalContext();
    const { openModal } = useConfirmModal();
    const [isSending, setSending] = useState(false);

    const [iconName, iconText]: [ICON_NAME, string] = useMemo(() => {
        if (lesson.isCanceled) {
            return ['cancelled', 'Odwołane'];
        }
        if (lesson.isPaid) {
            return ['payments', 'Opłacone'];
        }
        return ['cancel', 'Nieopłacone'];
    }, [lesson]);

    const handleRestoreLesson = async (): Promise<void> => {
        try {
            setSending(true);
            await lessonsService.restore(lesson.id);
            showAlert({
                message: 'Przywrócono',
                severity: 'success',
            });
            setIsOpen(false);
            onChange?.();
        } catch (e) {
            showAlert({
                message: 'Błąd',
                severity: 'danger',
            });
        }
        setSending(false);
    };

    const handleDeleteLesson = async (): Promise<void> => {
        if (lesson.eventSeriesId) {
            setModalBody(
                <LessonDeleteModal
                    lesson={lesson}
                    cb={() => {
                        setIsOpen(false)
                        onChange?.();
                    }}
                />,
            );
            setIsOpen(true);
        } else {
            openModal({
                onConfirm: async () => {
                    await lessonsService.delete(lesson.id);
                    onChange?.();
                },
                message: `Czy na pewno chcesz usunąć lekcje z kalendarza ${lesson.name} - ${lesson.date}?`,
            });
        }
    };

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
                {!lesson.isCanceled ? (
                    <Button
                        icon="pencil"
                        size="small"
                        onClick={() => {
                            setIsOpen(false);
                            goToEditForm();
                        }}
                        label="Edytuj lekcje"
                        severity="warning"
                        disabled={isSending}
                    />
                ) : (
                    <View style={{ gap: 10, width: '100%' }}>
                        <Button
                            icon="refresh"
                            size="small"
                            onClick={() => {
                                handleRestoreLesson();
                            }}
                            label="Przywróć zajęcia"
                            severity="warning"
                        />
                        <Button
                            icon="trash"
                            size="small"
                            onClick={() => {
                                handleDeleteLesson();
                            }}
                            label="Usuń zajęcia z kalendarza"
                            severity="error"
                        />
                    </View>
                )}
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
