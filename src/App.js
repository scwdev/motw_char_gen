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
import Main from './pages/generator/main';

import NewCharacter from './pages/generator/newCharacter';
import Notes from './components/notes';




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
  const hunterName = () => {
    const handleName = (input) => {
      setNewChar({...newChar, details:{...newChar.details, name:input}})
  }
    return (
      <Notes handleChange={handleName} value={newChar.details.name} placeholder="Your hunter's name" />
    )
  }
  

  return (
    <div className="App">
      <h3>Monster of the Week<br/>Character Generator</h3>
      <Nav newChar={newChar} apiCall={apiCall} />
      {hunterName()}
      <Switch>
        <Route exact path='/'>
          <Main />  
        </Route>
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
      <footer>Monster of the Week designed by Michael Sands and Steve Hickey.<br/>This app created by Noam Blanks. MOTWAPI created by Sam McCall.</footer>

    </div>
  );
}

export default App;
