import React from 'react'
import Home from './pages/Home'
import SinglePostComponent from './pages/SinglePostComponent'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/:slug' component={SinglePostComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
