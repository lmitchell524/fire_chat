import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Lobby from './lobby';
import ChatRoom from './chat_room';


const App = () => (
    <div className='container'>
        <h1 className='center'>Fire 🔥 Chat</h1>
        <Route exact path='/' component={Lobby}></Route>
        <Route path='/room/:roomId/log/:logId' component={ChatRoom}/>
    </div>
);

export default App;
