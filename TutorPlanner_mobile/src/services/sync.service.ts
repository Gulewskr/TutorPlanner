export enum TABLES_NAMES {
    EVENT = 'EVENT',
    LESSON = 'LESSON',
    WEEKLY_PATTERN = 'WEEKLY_PATTERN',
    STUDENT = 'STUDENT',
    PAYMENT = 'PAYMENT',
}

class SyncService {
    sendDataToSave = async (
        data: string,
        tableName: TABLES_NAMES,
    ): Promise<void> => {
        //TODO
    };

    fetchDataFromServer = async <T>(
        data: string,
        tableName: TABLES_NAMES,
    ): Promise<T> => {
        //TODO
        return undefined as T;
    };

    // TODO - send all data from local db and export as json file
    generateJSONFileToDownload = async <T>(data: string): Promise<T> => {
        //TODO
        return undefined as T;
    };
}

export const syncService = new SyncService();
