import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './Components/Layout';

require('../styles/main.sass');

const appContainer = document.getElementById('app');

ReactDOM.render(<Layout />, appContainer);