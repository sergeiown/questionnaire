import React, { useEffect, useState } from 'react';

import ExcelFileManager from '../../services/Excel';
import fileNameService from '../../API/fileNameService';
import MyButton from '../UI/button/MyButton';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [fileName, setFilename] = useState('');
    const [isFileName, setIsFileName] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFiles = async () => {
        const files = await ExcelFileManager.getAll();
        files.sort((a, b) => b.name.localeCompare(a.name));
        setFiles(files);
    };

    const fetchFileName = async () => {
        const fileName = await fileNameService.get();
        setFilename(fileName);
    };

    const handleFileDelete = async (url) => {
        await ExcelFileManager.delete(url);
        fetchFiles();
    };

    useEffect(() => {
        fetchFiles();
        fetchFileName();
    }, []);

    useEffect(() => {
        if (!isLoading && fileName && files.some((file) => file.name === fileName)) {
            setIsFileName(true);
        } else if (!isLoading && fileName) {
            ExcelFileManager.create(fileName).then(() => fetchFiles());
        }
    }, [fileName, files, isLoading]);

    useEffect(() => {
        if (files.length > 0 && fileName !== '') {
            setIsLoading(false);
        }
    }, [files, fileName]);

    return (
        <>
            {isFileName && (
                <ul className="fileList">
                    {files.map((file, index) => (
                        <li key={file.name}>
                            <div className="fileName">
                                <span>{index + 1}. </span>
                                <p>{file.name}</p>
                            </div>
                            <MyButton title="Видалити" onClick={() => handleFileDelete(file.url)}>
                                &#9940;
                            </MyButton>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default FileList;
