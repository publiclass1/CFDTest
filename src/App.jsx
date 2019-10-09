import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Coordinate from './screens/Coordinate/Coordinate';
import Chart from './screens/Chart/Chart';
import Home from './Home';
import Menubar from './Menubar';

function App() {
  return (
    <Router>
      <Container>
        <Menubar />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/coordinate">
              <Coordinate />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
