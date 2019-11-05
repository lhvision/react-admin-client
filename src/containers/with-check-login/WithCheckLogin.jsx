import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// withRouter  函数----你给我组件,我把你变成路由组件
function WithCheckLogin(WrappedComponent) {
  // 不是路由组件,所有没有location--->pathname
  return connect((state) => ({ token: state.user.token}), null )(withRouter(class extends Component{
    static displayName = `WrappedComponent(${WrappedComponent.displayName||WrappedComponent.name||'Component'})`
    // 验证功能
    // 如果地址是/login,并且token存在,去/ --- 首页
    // 如果地址不是/login,并且不存在token,去login
    render(){
      const {token, ...rest} = this.props
      const { location:{pathname} } = rest
      
      //const {pathname}=this.props.location
      // const { location, token, history, match } = this.props
      // const { pathname } = location
      
      if( pathname === '/login' && token ) return <Redirect to='/'/>
      if( pathname !== '/login' && !token ) return <Redirect to='/login'/>
      
      // 返回一个新组件就是login
      return <WrappedComponent {...rest}/>
      // return <WrappedComponent location={location} history={history} match={match} />      
    }
  }))
}
export default WithCheckLogin
