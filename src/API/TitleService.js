import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class TitleService {
    static async update(postsListTitle) {
        await StorageData.doc('postsListTitle')
            .set({ data: postsListTitle })
            .then(() => {
                console.log(
                    `postsListTitle(${JSON.parse(
                        postsListTitle
                    )}) written to Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
                );
            })
            .catch((error) => {
                console.error(`Error writing postsListTitle: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `PostsListTitle(${JSON.parse(data[4].data)}) read from Firestore at ${new Date().toLocaleTimeString(
                    'uk-UA'
                )}`
            );

            return JSON.parse(data[4].data);
        } catch (error) {
            console.error(`Error reading postsListTitle: ${error}`);
            return [];
        }
    }
}
