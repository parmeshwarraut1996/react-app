import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import SignUp from './components/signUp';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' component={Login}/>
        <Route path='/' component={SignUp}/>
      </Router>
      
    </div>
  );
}

export default App;
