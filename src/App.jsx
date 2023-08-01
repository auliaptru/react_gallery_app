import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';

import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Signin from './components/Signin/Signin';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/signup'
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <PublicRoute>
                            <Signin />
                        </PublicRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
