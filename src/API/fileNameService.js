import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class fileNameService {
    static async update(fileName) {
        await StorageData.doc('presentFileName')
            .set({ data: fileName })
            .then(() => {
                console.log(
                    `fileName(${JSON.parse(
                        fileName
                    )}) successfully written to Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
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
                `fileName(${JSON.parse(
                    data[5].data
                )}) successfully read from Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
            );

            return JSON.parse(data[5].data);
        } catch (error) {
            console.error(`Error reading fileName: ${error}`);
            return [];
        }
    }
}
