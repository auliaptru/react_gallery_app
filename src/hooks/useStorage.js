import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { db, storage } from '../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';

const useStorage = () => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);

    const { user } = useAuth();

    let toastId = null;

    const startUpload = (file) => {
        if (!file) {
            return;
        }

        const fileId = uuidv4();
        const typeFile = file.type.split('/')[1];

        const storageRef = ref(storage, `images/${fileId}.${typeFile}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        toastId = toast.loading(`Uploading ${Math.round(progress)}%`, {
            duration: Infinity,
        });

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);

                toast.remove(toastId);
                toastId = toast.loading(`Uploading ${Math.round(progress)}%`, {
                    duration: Infinity,
                });
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        setError(error.code);
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        setError(error.code);
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        setError(error.code);
                        break;
                }
            },
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                );
                setProgress(progress);

                // firestore
                await addDoc(collection(db, 'images'), {
                    imgUrl: downloadURL,
                    createdAt: new Date(),
                    userName: user?.displayName,
                    userEmail: user?.email,
                });

                toast.success('File uploaded successfully!');
                toast.dismiss(toastId);
            }
        );
    };

    return {
        progress,
        error,
        startUpload,
    };
};

export default useStorage;
