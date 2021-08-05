import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';

import './App.css';
// import './reset.css'

import Playbooks from './pages/generator/playbooks';
import Moves from './pages/generator/moves';
import Ratings from './pages/generator/ratings';
import Gear from './pages/generator/gear'
import Details from './pages/generator/details';
import History from './pages/generator/history'
import Specials from './pages/generator/specials';
import Nav from './components/nav';

import NewCharacter from './pages/generator/newCharacter';




function App() {

  const [apiData, setApiData] = useState({origin: null, data: null})

  const apiCall = async (path) => {
    // if (apiData) {
    //   setApiData(null)
    // } else {
      const api = `https://motwapi.com/api/v1/${path}`
      const response = await fetch(api)
      // console.log('response:', response)
      const data = await response.json()
      setApiData({origin: path, data: data})
      // console.log('path:', path, '// apiData:', apiData)
    // }
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
        playbook: [],
        notes: null
      },
      ratings: null,
      history: [],
      path: null
    })

  // console.log(newChar)

  return (
    <div className="App">
      <h1>App Component</h1>
      <Nav newChar={newChar} apiCall={apiCall} />
      <Switch>
        <Route path='/playbooks'>
          <Playbooks apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />    
        </Route>
        <Route
          path='/:playbook/moves'
          render={(routerProps) => {
            return <Moves {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
          }}
          />
        <Route
          path='/:playbook/ratings'
          render={(routerProps) => {
            return <Ratings {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
          }}
          />
        <Route
          path='/:playbook/gear'
          render={(routerProps) => {
            return <Gear {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
          }}
          />
        <Route
        path='/:playbook/details'
        render={(routerProps) => {
          return <Details {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
        }}
        />
        <Route
        path='/:playbook/history'
        render={(routerProps) => {
          return <History {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
        }}
        />
        <Route
        path='/:playbook/specials'
        render={(routerProps) => {
          return <Specials {...routerProps} apiData={apiData.data} apiOrigin={apiData.origin} apiCall={apiCall} newChar={newChar} updateChar={setNewChar} />
        }}
        />
        <Route
        path='/newCharacter'
        render={(routerProps) => {
          return <NewCharacter {...routerProps} newChar={newChar} updateChar={setNewChar} />
        }}
        />
      </Switch>
      
      
    </div>
  );
}

export default App;
