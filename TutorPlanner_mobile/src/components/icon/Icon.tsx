import { Image, StyleSheet } from 'react-native';

interface IconProps {
    icon: ICON_NAME;
    size?: 'xxs' | 'xs' | 'sm' | 'lg' | 'xl';
}

type ICON_NAME =
    | 'addLesson'
    | 'addPayment'
    | 'addStudent'
    | 'back'
    | 'calendar'
    | 'cancel'
    | 'home'
    | 'minus'
    | 'notes'
    | 'payments'
    | 'plus'
    | 'settings'
    | 'students'
    | 'messenger'
    | 'oneNote'
    | 'pencil';

const iconsMap: { [key in ICON_NAME]: any } = {
    cancel: require('../../assets/icons/cancel.png'),
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
    messenger: require('../../assets/icons/messenger.png'),
    oneNote: require('../../assets/icons/oneNote.png'),
    pencil: require('../../assets/icons/pencil.png'),
};

const Icon: React.FC<IconProps> = ({ icon, size }) => (
    <Image
        source={iconsMap[icon]}
        style={[styles.icon, size && styles[`icon-${size}`]]}
    />
);

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    'icon-xxs': {
        width: 15,
        height: 15,
    },
    'icon-xs': {
        width: 20,
        height: 20,
    },
    'icon-sm': {
        width: 25,
        height: 25,
    },
    'icon-lg': {
        width: 40,
        height: 40,
    },
    'icon-xl': {
        width: 50,
        height: 50,
    },
});

export default Icon;
export { type ICON_NAME };
