import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import './signup.scss';

const Signup = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateDisplayName(user, displayName);
            toast.success('Sign-up Successfully!');
            navigate('/signin');
        } catch (error) {
            if (error.code === 'auth/weak-password') {
                toast.error('Password should be at least 6 characters');
            } else if (error.code === 'auth/email-already-in-use') {
                toast.error('Email already in use.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email.');
            }
            console.log(error.message);
        }
    };

    const updateDisplayName = async (user, name) => {
        try {
            await updateProfile(user, {
                displayName: name,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='signup'>
            <div className='signup__wrapper'>
                <h1>Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        placeholder='Enter your name'
                        id='name'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        required
                    />
                    <button type='submit'>Sign Up</button>
                    <p>
                        Already have an account? <a href='/signin'>Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
