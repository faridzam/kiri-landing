import React, {useState} from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Navigation} from './components'
import {Home, Success} from './pages'
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Navigation />
        <main>
          <Switch>
            <Route path="/" component={Home}/>
            <Route path="/success" component={Success} exact/>
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;