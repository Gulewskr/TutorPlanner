import { Image, StyleSheet } from 'react-native';

interface IconProps {
    icon: ICON_NAME;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

type ICON_NAME =
    | 'add'
    | 'addLesson'
    | 'addNote'
    | 'addPayment'
    | 'addStudent'
    | 'arrowLeft'
    | 'arrowRight'
    | 'back'
    | 'bell'
    | 'calendar'
    | 'calendar-student'
    | 'cancelled'
    | 'cancel'
    | 'check'
    | 'checkbox'
    | 'checkmark'
    | 'diagram'
    | 'download'
    | 'event'
    | 'filter'
    | 'gmail'
    | 'home'
    | 'list'
    | 'message'
    | 'messenger'
    | 'minus'
    | 'more'
    | 'notes'
    | 'oneNote'
    | 'payments'
    | 'payments-missing'
    | 'payments-done'
    | 'pencil'
    | 'phone'
    | 'plus'
    | 'refresh'
    | 'series'
    | 'settings'
    | 'settingsPanel'
    | 'studentCap'
    | 'students'
    | 'trash'
    | 'upload';

const iconsMap: { [key in ICON_NAME]: any } = {
    add: require('../../assets/icons/add.png'),
    addLesson: require('../../assets/icons/addLesson.png'),
    addNote: require('../../assets/icons/addNote.png'),
    addPayment: require('../../assets/icons/addPayment.png'),
    addStudent: require('../../assets/icons/addStudent.png'),
    arrowLeft: require('../../assets/icons/arrowLeft.png'),
    arrowRight: require('../../assets/icons/arrowRight.png'),
    back: require('../../assets/icons/back.png'),
    bell: require('../../assets/icons/bell.png'),
    calendar: require('../../assets/icons/calendar.png'),
    'calendar-student': require('../../assets/icons/calendar-student.png'),
    cancel: require('../../assets/icons/cancel.png'),
    cancelled: require('../../assets/icons/cancelled.png'),
    check: require('../../assets/icons/check.png'),
    checkbox: require('../../assets/icons/checkbox.png'),
    checkmark: require('../../assets/icons/checkmark.png'),
    diagram: require('../../assets/icons/diagram.png'),
    download: require('../../assets/icons/download.png'),
    event: require('../../assets/icons/event.png'),
    filter: require('../../assets/icons/filter.png'),
    gmail: require('../../assets/icons/gmail.png'),
    home: require('../../assets/icons/home.png'),
    list: require('../../assets/icons/list.png'),
    message: require('../../assets/icons/message.png'),
    messenger: require('../../assets/icons/messenger.png'),
    minus: require('../../assets/icons/minus.png'),
    more: require('../../assets/icons/more.png'),
    notes: require('../../assets/icons/notes.png'),
    oneNote: require('../../assets/icons/oneNote.png'),
    payments: require('../../assets/icons/payments.png'),
    'payments-missing': require('../../assets/icons/payments-missing.png'),
    'payments-done': require('../../assets/icons/payments-done.png'),
    pencil: require('../../assets/icons/pencil.png'),
    phone: require('../../assets/icons/phone.png'),
    plus: require('../../assets/icons/plus.png'),
    refresh: require('../../assets/icons/refresh.png'),
    settings: require('../../assets/icons/settings.png'),
    series: require('../../assets/icons/series.png'),
    settingsPanel: require('../../assets/icons/settingsPanel.png'),
    studentCap: require('../../assets/icons/studentCap.png'),
    students: require('../../assets/icons/students.png'),
    trash: require('../../assets/icons/trash.png'),
    upload: require('../../assets/icons/upload.png'),
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
    'icon-md': {
        width: 30,
        height: 30,
        resizeMode: 'contain',
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
