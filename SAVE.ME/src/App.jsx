import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Profile from './pages/Profile/Profile';

const App = () => {
    return (
        <Router>
            <Profile />
        </Router>
    );
};

export default App;
