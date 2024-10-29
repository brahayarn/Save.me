import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NotFound from './pages/NotFound/NotFound';

const App = () => {
    return (
        <Router>
            <NotFound />
        </Router>
    );
};

export default App;
