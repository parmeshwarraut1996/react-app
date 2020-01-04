import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import SignUp from './components/signUp';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/signUp' component={SignUp} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
