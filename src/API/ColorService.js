import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class ColorService {
    static async update(postsListColor) {
        await StorageData.doc('postsListColor')
            .set({ data: postsListColor })
            .then(() => {
                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} color (${JSON.parse(
                        postsListColor
                    )}) written to Firestore`
                );
            })
            .catch((error) => {
                console.error(`Error writing color: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} color (${JSON.parse(data[2].data)}) read from Firestore`
            );

            return JSON.parse(data[2].data);
        } catch (error) {
            console.error(`Error reading color: ${error}`);
            return [];
        }
    }
}
