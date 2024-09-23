import { Image, StyleSheet } from 'react-native'

interface IconProps {
    icon: ICON_NAME
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
}

const Icon: React.FC<IconProps> = ({ icon, size }) => (
    <Image
        source={iconsMap[icon]}
        style={[
            styles.icon,
            size == 'xxs' && styles['icon-xxs'],
            size == 'xs' && styles['icon-xs'],
            size == 'sm' && styles['icon-sm'],
            size == 'lg' && styles['icon-lg'],
            size == 'xl' && styles['icon-xl'],
        ]}
    />
)

const styles = StyleSheet.create({
    'icon-xxs': {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    'icon-xs': {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    'icon-sm': {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    'icon-lg': {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    'icon-xl': {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
})

export default Icon
export { type ICON_NAME }
