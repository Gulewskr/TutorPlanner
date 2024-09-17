import { Image, StyleSheet } from 'react-native';

interface IconProps {
    icon: ICON_NAME;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export type ICON_NAME =
    | 'minus'
    | 'plus'
    | 'calendar'
    | 'students'
    | 'home'
    | 'payments'
    | 'notes'
    | 'back'
    | 'settings'
    | 'addLesson'
    | 'addPayment'
    | 'addStudent';

const iconsMap: { [key in ICON_NAME]: any } = {
    minus: require('../../assets/icons/minus.png'),
    plus: require('../../assets/icons/plus.png'),
    calendar: require('../../assets/icons/calendar.png'),
    students: require('../../assets/icons/students.png'),
    home: require('../../assets/icons/home.png'),
    payments: require('../../assets/icons/payments.png'),
    notes: require('../../assets/icons/notes.png'),
    back: require('../../assets/icons/back.png'),
    settings: require('../../assets/icons/settings.png'),
    addStudent: require('../../assets/icons/addStudent.png'),
    addPayment: require('../../assets/icons/addPayment.png'),
    addLesson: require('../../assets/icons/addLesson.png'),
};

export const Icon: React.FC<IconProps> = ({ icon, size }) => (
    <Image
        source={iconsMap[icon]}
        style={[styles.icon, size == 'xs' && styles['icon-sm']]}
    />
);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    'icon-sm': {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
});
