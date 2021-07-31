import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Playbooks from './pages/generator/playbooks';
import Moves from './pages/generator/moves';
import Ratings from './pages/generator/ratings';
import Nav from './components/nav';



function App() {

  const [apiData, setApiData] = useState(null)

  const apiCall = async (path) => {
    if (apiData) {
      setApiData(null)
    } else {
      const api = `https://motwapi.com/api/v1/${path}`
      const response = await fetch(api)
      const data = await response.json()
      setApiData(data)
    }
  }
  
  const [newChar, setNewChar] = useState({
      playbook: null, 
      moves: {
        basic: null,
        playbook: [],
        other: null
      }, 
      details: {
        charName: null,
        pronouns: null,
        look: null,
        notes: null
      },
      gear: {
        weapons: null,
        other: null,
        notes: null
      },
      ratings: null,
      history: null,
      path: null
    })

  // console.log(newChar)

  return (
    <div className="App">
      <h1>App Component</h1>
      <Nav newChar={newChar} apiCall={apiCall} />
      <Switch>
        <Route path='/playbooks'>
          <Playbooks apiData={apiData} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />    
        </Route>
        <Route
          path='/:playbook/moves'
          render={(routerProps) => {
            return <Moves {...routerProps} apiData={apiData} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
          }}
          />
        <Route
          path='/:playbook/ratings'
          render={(routerProps) => {
            return <Ratings {...routerProps} apiData={apiData} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
          }}
          />
        {/* <Route path={`/${newChar.path}/moves`} >
          <Moves apiData={apiData} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />    
        </Route> */}
      </Switch>
      
      
    </div>
  );
}

export default App;
