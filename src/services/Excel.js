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

        console.log(
            `ExcelFile(${fileName}.xlsx) successfully written to Firestorage at ${new Date().toLocaleTimeString(
                'uk-UA'
            )}`
        );
    };
}
