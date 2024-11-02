import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Chat from './pages/Chat/Chat';
import Groups from './pages/Group/Group';
import NotFound from './pages/NotFound/NotFound';
import Tags from './pages/People/People';
import Profile from './pages/Profile/Profile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/tags" element={<Tags />} />
                <Route path="/settings" element={<Profile />} />
            </Routes>
            <NotFound />
        </Router>
    );
};

export default App;
