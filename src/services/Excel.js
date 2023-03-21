import firebase from 'firebase/app';
import 'firebase/storage';
import db from '../API/FirebaseConfig';
import * as XLSX from 'xlsx';

const files = db.collection('ExcelFiles');

export default class ExcelFileManager {
    static create = async (fileName, questions) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`ExcelFiles/${fileName}.xlsx`);
        const sheetName = 'survey';
        const worksheet = XLSX.utils.json_to_sheet([{}], { header: questions });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        const buffer = XLSX.write(workbook, { type: 'buffer' });
        await fileRef.put(buffer);
        const fileUrl = await fileRef.getDownloadURL();
        await files.doc(fileName).set({
            name: fileName,
            url: fileUrl,
        });
    };

    static update = async (fileName, answers) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`ExcelFiles/${fileName}.xlsx`);
        const worksheet = XLSX.utils.sheet_add_aoa(XLSX.utils.sheet_from_array([]), [answers]);
        const workbook = await XLSX.utils.book_new();
        await XLSX.utils.book_append_sheet(workbook, worksheet, 'survey');
        const buffer = await XLSX.write(workbook, { type: 'buffer' });
        await fileRef.put(buffer);
        return true;
    };

    static getAllFileNames = async () => {
        const snapshot = await files.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    static get = async (fileUrl) => {
        const response = await fetch(fileUrl);
        const data = await response.blob();
        return data;
    };

    static delete = async (fileId) => {
        const fileDoc = await files.doc(fileId).get();
        if (!fileDoc.exists) {
            return false;
        }
        const fileUrl = fileDoc.data().url;
        const storageRef = firebase.storage().refFromURL(fileUrl);
        await storageRef.delete();
        await files.doc(fileId).delete();
        return true;
    };
}
