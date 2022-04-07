import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import { Contextprovider } from './SocketContext';

import './style.css';

ReactDOM.render(

        <Contextprovider>
        <App />
        </Contextprovider>
        
    ,
    document.getElementById('root')
)
