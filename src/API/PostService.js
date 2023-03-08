// import axios from 'axios';
import db from './FirebaseConfig';

const StorageData = db.collection('StorageData');

export default class PostService {
    static async getNew() {
        /*   try {
            const response = await axios.get('/posts.json');
            return response.data;
        } catch (e) {
            console.log(e);
        } */
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `newPostsList(${
                    JSON.parse(data[0].data).length
                }) successfully read from Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
            );

            return JSON.parse(data[0].data);
        } catch (error) {
            console.error(`Error reading newPostsList: ${error}`);
            return [];
        }
    }

    static async update(postsList) {
        await StorageData.doc('postsList')
            .set({ data: postsList })
            .then(() => {
                console.log(
                    `postsList(${
                        JSON.parse(postsList).length
                    }) successfully written to Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
                );
            })
            .catch((error) => {
                console.error(`Error writing postsList: ${error}`);
            });
    }

    static async get() {
        try {
            const querySnapshot = await StorageData.get();
            const data = querySnapshot.docs.map((doc) => doc.data());

            console.log(
                `newPostsList(${
                    JSON.parse(data[1].data).length
                }) successfully read from Firestore at ${new Date().toLocaleTimeString('uk-UA')}`
            );

            return JSON.parse(data[1].data);
        } catch (error) {
            console.error(`Error reading postsList: ${error}`);
            return [];
        }
    }
}
