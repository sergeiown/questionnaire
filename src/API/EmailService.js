import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class EmailService {
    static async update(postsListEmail) {
        await StorageData.doc('postsListEmail')
            .set({ data: postsListEmail })
            .then(() => {
                console.log(
                    `postsListEmail(${JSON.parse(
                        postsListEmail
                    )}) successfully written to Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
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
                `PostsListEmail(${JSON.parse(
                    data[2].data
                )}) successfully read from Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
            );

            return JSON.parse(data[2].data);
        } catch (error) {
            console.error(`Error reading postsListEmail: ${error}`);
            return [];
        }
    }
}
