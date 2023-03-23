import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class ColorService {
    static async update(postsListColor) {
        await StorageData.doc('postsListColor')
            .set({ data: postsListColor })
            .then(() => {
                console.log(
                    `postsListColor(${JSON.parse(
                        postsListColor
                    )}) written to Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
                );
            })
            .catch((error) => {
                console.error(`Error writing postsListColor: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `PostsListColor(${JSON.parse(data[2].data)}) read from Firestore at ${new Date().toLocaleTimeString(
                    'uk-UA'
                )}`
            );

            return JSON.parse(data[2].data);
        } catch (error) {
            console.error(`Error reading postsListColor: ${error}`);
            return [];
        }
    }
}
