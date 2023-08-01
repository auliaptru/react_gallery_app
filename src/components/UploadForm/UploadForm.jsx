import useStorage from '../../hooks/useStorage';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import './uploadForm.scss';

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const { startUpload } = useStorage();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            startUpload(file);
        } else {
            toast.error('No file selected.');
        }
        setFile(null);
    };
    return (
        <div className='upload__container'>
            <form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
                <div className='upload__wrapper'>
                    <label
                        htmlFor='file-input'
                        className='upload__button-label'
                    >
                        Choose File
                    </label>
                    <input
                        type='file'
                        id='file-input'
                        className='upload__input'
                        onChange={handleFileChange}
                    />
                    <span className='file__name' id='file-name-display'>
                        {file ? file.name : 'No file chosen'}
                    </span>
                </div>
                <button type='submit' className='upload__button'>
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
