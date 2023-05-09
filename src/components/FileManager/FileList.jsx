import React, { useEffect, useState } from 'react';

import ExcelFileManager from '../../services/Excel';
import fileNameService from '../../API/fileNameService';
import SurveyService from '../../API/SurveyService';
import MyButton from '../UI/button/MyButton';
import Loader from '../UI/Loader/Loader';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [fileName, setFilename] = useState('');
    const [recipientNum, setRecipientNum] = useState('');
    const [dateOfEnd, setDateOfEnd] = useState([]);
    const [isFileName, setIsFileName] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFiles = async () => {
        const files = await ExcelFileManager.getAll();
        files.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setFiles(files);
    };

    const fetchFileName = async () => {
        const fileName = await fileNameService.get();
        setFilename(fileName);
    };

    const fetchRecipientNum = async () => {
        const recipientNum = await SurveyService.get();
        setRecipientNum(recipientNum.length);
        setDateOfEnd(recipientNum[recipientNum.length - 1].split('"')[1]);
    };

    const handleFileDelete = async (url) => {
        await ExcelFileManager.delete(url);
        fetchFiles();
    };

    useEffect(() => {
        fetchFiles();
        fetchFileName();
        fetchRecipientNum();
    }, []);

    useEffect(() => {
        if (!isLoading && fileName) {
            ExcelFileManager.create(fileName).then(() => fetchFiles());
            setIsFileName(true);
        }
    }, [fileName, isLoading]);

    useEffect(() => {
        if (files.length > 0 && fileName !== '') {
            setTimeout(() => setIsLoading(false), 1000);
        } else {
            setIsLoading(true);
        }
    }, [files, fileName]);

    return isLoading ? (
        <div className="loader">
            <Loader />
        </div>
    ) : (
        <>
            {isFileName && (
                <ul className="fileList">
                    {files.map((file, index) => (
                        <li key={file.name}>
                            {index === 0 && (
                                <a
                                    className="downloadUrl"
                                    href={file.url}
                                    title={`Опитування активне, остання відповідь: ${dateOfEnd}. Всього респондентів: ${recipientNum}`}
                                    download
                                >
                                    <div className="fileName">
                                        <span>{index + 1}. </span>
                                        <p>{file.name}</p>
                                    </div>
                                </a>
                            )}
                            {index > 0 && (
                                <a
                                    className="downloadUrl"
                                    href={file.url}
                                    title={`Опитування завершене ${dateOfEnd}. Всього респондентів: ${recipientNum}`}
                                    download
                                >
                                    <div className="fileName">
                                        <span>{index + 1}. </span>
                                        <p>{file.name}</p>
                                    </div>
                                </a>
                            )}
                            {index === 0 && (
                                <MyButton title="Видалити" disabled>
                                    &#9940;
                                </MyButton>
                            )}
                            {index > 0 && (
                                <MyButton title="Видалити" onClick={() => handleFileDelete(file.url)}>
                                    &#9940;
                                </MyButton>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default FileList;
