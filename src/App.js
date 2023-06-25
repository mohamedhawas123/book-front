import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Container} from 'react-bootstrap'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginScrean from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import RegisterScrean from './screens/signupScreen';
import PageScreen from './screens/pageScreen'
import HomeAuthorScreen from './screens/homeAuthorScreen'
import Header from './componets/header';


function App() {
  return (
    <React.Fragment>
      <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Route exact path='/signIn' component={LoginScrean} />
          <Route exact path='/signup' component={RegisterScrean} />
          <Route exact path="/:id/page" component={PageScreen} />
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/home' component={HomeAuthorScreen} />


          

        </Container>
      </main>
      </Router>
     
    </React.Fragment>
  );
}

export default App;
