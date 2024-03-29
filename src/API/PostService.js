import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class PostService {
    static async getNew() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} new questions (${
                    JSON.parse(data[0].data).length
                }) read from Firestore`
            );

            return JSON.parse(data[0].data);
        } catch (error) {
            console.error(`Error reading new questions: ${error}`);
            return [];
        }
    }

    static async update(postsList) {
        await StorageData.doc('postsList')
            .set({ data: postsList })
            .then(() => {
                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} questions (${
                        JSON.parse(postsList).length
                    }) written to Firestore`
                );
            })
            .catch((error) => {
                console.error(`Error writing questions: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} questions (${
                    JSON.parse(data[1].data).length
                }) read from Firestore`
            );

            return JSON.parse(data[1].data);
        } catch (error) {
            console.error(`Error reading questions: ${error}`);
            return [];
        }
    }
}
