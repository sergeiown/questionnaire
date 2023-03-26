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
                console.error(`Error writing email: ${error}`);
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
            console.error(`Error reading email: ${error}`);
            return [];
        }
    }

    static async getServiceInfo() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(`${new Date().toLocaleTimeString('uk-UA')} service information read from Firestore`);

            return { init: data[6].init, service: data[6].service, template: data[6].template };
        } catch (error) {
            console.error(`Error reading service information: ${error}`);
            return [];
        }
    }
}
