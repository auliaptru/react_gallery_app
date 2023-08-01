import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collectionName) => {
    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        const getData = async () => {
            try {
                const q = query(
                    collection(db, collectionName),
                    orderBy('createdAt', 'desc')
                );
                unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const images = [];
                    querySnapshot.forEach((doc) => {
                        images.push(doc.data());
                    });
                    setImgs(images);
                    setLoading(false);
                });
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getData();

        return () => unsubscribe && unsubscribe();
    }, [collectionName]);

    return { imgs, loading };
};

export default useFirestore;
