import React from 'react';
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

const App = () => {
  return (
    <div className='div'>
     <Router>
      <Routes>
      <Route path="/"  element={<Join/>} />
      <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
