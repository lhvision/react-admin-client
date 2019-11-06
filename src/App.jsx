import React, { Component, Suspense } from 'react';
// 引入路由
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// 引入组件
import router from './config/routes.js'
// 引入NotMatch组件
import NotMatch from './components/not-match/NotMatch.jsx'
// 引入最外面的大的组件
import BasicLayout from './components/basic-layout/BasicLayout.jsx'
// 引入Login
import Login from './containers/Login/Login.jsx'
// 引入spin
import { Spin } from 'antd';
class App extends Component {
  render() {
    return (
      <Suspense fallback={ <Spin size="large" />}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <BasicLayout>
              <Switch>
              {
                router.map((route, index) => (<Route key={index} {...route} />))
              }
              {/* <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Admin} />
              </Switch> */}

              {/* <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Admin} /> */}
              {/* 如果没有path,那么只要地址不是/和不是/login,就匹配我下面的 */}
              <Route component={NotMatch} />
              </Switch>
            </BasicLayout>
          </Switch>
      
        </Router>
      </Suspense>
    );
  }
}

export default App;
