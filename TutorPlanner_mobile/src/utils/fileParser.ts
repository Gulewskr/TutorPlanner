import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

export const exportDataToJsonFile = async (
    data: any,
    filename: string,
): Promise<void> => {
    try {
        const filePath = RNFS.DocumentDirectoryPath + `/${filename}.json`;
        const fileData = JSON.stringify(data);
        await exportToFile(filePath, fileData);
    } catch (error) {
        console.error('Error saving file: ', error);
    }
};

export const exportToFile = async (
    fileName: string,
    data: string,
): Promise<void> => {
    try {
        await RNFS.writeFile(fileName, data, 'utf8');
    } catch (error) {
        console.error('Error saving file: ', error);
    }
};

//TODO fileName?
export const importFromFile = (fileName: string): void => {};

export const chooseFile = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        //console.log('URI : ' + res.uri);
        //console.log('Type : ' + res.type);
        //console.log('Name : ' + res.name);
        //console.log('Size : ' + res.size);
        // Handle the picked file here, such as reading its contents
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, handle accordingly
        } else {
            // Error handling
            console.log('Error while picking file:', err);
        }
    }
};
