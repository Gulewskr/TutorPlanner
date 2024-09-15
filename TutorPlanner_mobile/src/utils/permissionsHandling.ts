import { PermissionsAndroid } from 'react-native';

const requestWritePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to storage to save files.',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Write permission granted');
        } else {
            console.log('Write permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
