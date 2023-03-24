import firebase from 'firebase/app';
import 'firebase/storage';
import db from './FirebaseConfig';

const images = db.collection('Images');

export default class ImageService {
    static async upload(file) {
        const storageRef = firebase.storage().ref(`Images/${file.name}`);
        const imageRef = images.doc('image');

        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();
        await imageRef.set({ url });

        console.log(`${new Date().toLocaleTimeString('uk-UA')} postsListImage(${file.name}) written to Firestorage`);

        return url;
    }

    static async getBase() {
        await this.delete();

        const imageRef = images.doc('baseImage');
        const doc = await imageRef.get();

        if (doc.exists) {
            const url = doc.data().url;

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} postsListImage(baseImage.png) url read from Firestore`
            );

            return url;
        }
    }

    static async get() {
        const imageRef = images.doc('image');
        const doc = await imageRef.get();

        if (doc.exists) {
            const url = doc.data().url;

            console.log(
                `${new Date().toLocaleTimeString('uk-UA')} postsListImage(${
                    url.split('%2F').pop().split('?')[0]
                }) url read from Firestore`
            );

            return url;
        } else {
            const baseImageRef = images.doc('baseImage');
            const baseImageDoc = await baseImageRef.get();
            if (baseImageDoc.exists) {
                const url = baseImageDoc.data().url;

                console.log(
                    `${new Date().toLocaleTimeString('uk-UA')} postsListImage(${
                        url.split('%2F').pop().split('?')[0]
                    }) url read from Firestore`
                );

                return url;
            }
        }
    }

    static async delete() {
        const imageRef = images.doc('image');
        const doc = await imageRef.get();

        if (doc.exists) {
            const url = doc.data().url;
            const storageRef = firebase.storage().refFromURL(url);
            await storageRef.delete();
            await imageRef.delete();

            /* Delete all other images except baseImage.png */
            const allImages = await firebase.storage().ref('Images').listAll();
            const filteredImages = allImages.items.filter((item) => {
                return item.name !== 'baseImage.png';
            });

            for (const image of filteredImages) {
                await image.delete();
            }
        }

        console.clear();
    }
}
