import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthProtected from './firebase/AuthProtected';
import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';
import Groups from './pages/Group/Group';
import Tags from './pages/People/People';
import Profile from './pages/Profile/Profile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route
                    path="/profile"
                    element={
                        <AuthProtected>
                            <Profile />
                        </AuthProtected>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <AuthProtected>
                            <Chat />
                        </AuthProtected>
                    }
                />
                <Route
                    path="/groups"
                    element={
                        <AuthProtected>
                            <Groups />
                        </AuthProtected>
                    }
                />
                <Route
                    path="/tags"
                    element={
                        <AuthProtected>
                            <Tags />
                        </AuthProtected>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <AuthProtected>
                            <Profile />
                        </AuthProtected>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
