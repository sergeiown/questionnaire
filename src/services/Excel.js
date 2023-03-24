import firebase from 'firebase/app';
import 'firebase/storage';
import * as XLSX from 'xlsx';
import SurveyService from '../API/SurveyService';

export default class ExcelFileManager {
    static create = async (fileName) => {
        const surveyData = await SurveyService.get();
        const parsedData = surveyData.map((item) => JSON.parse(item));

        const worksheet = XLSX.utils.aoa_to_sheet(parsedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'survey');

        const storageRef = firebase.storage().ref(`XLSX/${fileName}.xlsx`);
        const blob = new Blob([XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })]);
        await storageRef.put(blob);

        console.log(`${new Date().toLocaleTimeString('uk-UA')} file (${fileName}.xlsx) written to Firestorage`);
    };

    static getAll = async () => {
        const storageRef = firebase.storage().ref('XLSX');
        const listResult = await storageRef.listAll();
        const files = [];

        await Promise.all(
            listResult.items.map(async (itemRef) => {
                const name = itemRef.name.split('.xlsx')[0];
                const url = await itemRef.getDownloadURL();
                files.push({ name, url });
            })
        );

        console.log(`${new Date().toLocaleTimeString('uk-UA')} list of files retrieved from Firestorage`);

        return files;
    };

    static delete = async (fileUrl) => {
        const storageRef = firebase.storage().refFromURL(fileUrl);
        await storageRef.delete();
        console.log(`${new Date().toLocaleTimeString('uk-UA')} old survey file deleted from Firestorage`);
    };
}
