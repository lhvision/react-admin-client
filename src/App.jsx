import React, { Component } from 'react';
// 引入路由
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// 引入组件
import router from './config/routes.js'

class App extends Component {
  render() {
    return (
      <Router>
        {
          router.map((route, index) => (<Route key={index} {...route} />))
        }
        {/* <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch> */}

        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Admin} /> */}
      </Router>
    );
  }
}

export default App;
