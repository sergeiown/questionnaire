import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class fileNameService {
    static async update(fileName) {
        await StorageData.doc('presentFileName')
            .set({ data: fileName })
            .then(() => {
                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} fileName(${JSON.parse(fileName)}) written to Firestore`
                );
            })
            .catch((error) => {
                console.error(`Error writing fileName: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} fileName(${JSON.parse(data[5].data)}) read from Firestore`
            );

            return JSON.parse(data[5].data);
        } catch (error) {
            console.error(`Error reading fileName: ${error}`);
            return [];
        }
    }
}
