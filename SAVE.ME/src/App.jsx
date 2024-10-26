import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Group from './pages/Group/Group';

const App = () => {
    return (
        <Router>
            <Group />
        </Router>
    );
};

export default App;
