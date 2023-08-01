import { useState } from 'react';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

import GridImages from '../GridImages/GridImages';
import UploadForm from '../UploadForm/UploadForm';
import './home.scss';

const Home = () => {
    const [openForm, setOpenForm] = useState(false);

    const user = auth.currentUser;
    const navigate = useNavigate();

    const showUploadForm = () => {
        setOpenForm(true);
        if (!user) {
            navigate('/signin');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Sign-out successfull');
            window.location.reload();

            setOpenForm(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSignin = () => {
        navigate('/signin');
    };

    return (
        <div className='home'>
            <div className='home__wrapper'>
                <div className='home__title'>
                    <h1>Gallery App</h1>
                    <p>A Beautiful Showcase of Captivating Moments</p>
                </div>
                {!user ? (
                    <button onClick={handleSignin}>Sign in</button>
                ) : (
                    <button onClick={handleLogout}>Sign out</button>
                )}
            </div>
            <div className='home__imgs'>
                {openForm && <UploadForm />}
                {!openForm && (
                    <button
                        className='home__submitBtn'
                        onClick={showUploadForm}
                    >
                        Submit Photo
                    </button>
                )}
                <GridImages />
            </div>
        </div>
    );
};

export default Home;
