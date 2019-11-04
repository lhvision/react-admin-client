import React, { Component } from 'react';
// 引入路由
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
// 引入组件
import Admin from './pages/Admin/Admin.jsx'
import Login from './pages/Login/Login.jsx'
class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Router>
    );
  }
}

export default App;
