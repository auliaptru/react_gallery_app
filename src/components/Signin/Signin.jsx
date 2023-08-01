import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import './signin.scss';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Sign-in Successfully!');
            navigate('/');
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Wrong password!');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('User not found');
            }
        }
    };

    return (
        <div className='signin'>
            <div className='signin__wrapper'>
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        placeholder='Enter your email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                    <button type='submit'>Sign In</button>
                    <p>
                        Already have an account? <a href='/signup'>Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signin;
