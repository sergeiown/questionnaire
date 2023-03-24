import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class EmailService {
    static async update(postsListEmail) {
        await StorageData.doc('postsListEmail')
            .set({ data: postsListEmail })
            .then(() => {
                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} email (${JSON.parse(
                        postsListEmail
                    )}) written to Firestore`
                );
            })
            .catch((error) => {
                console.error(`Error writing postsListEmail: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} email (${JSON.parse(data[3].data)}) read from Firestore`
            );

            return JSON.parse(data[3].data);
        } catch (error) {
            console.error(`Error reading postsListEmail: ${error}`);
            return [];
        }
    }
}
