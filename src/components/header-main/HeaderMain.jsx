import React, { Component } from 'react';
import { Layout, Modal } from 'antd'
import { Button, Icon } from 'antd';
// 引入样式
import './HeaderMain.less'

import screenfull from 'screenfull'
// 引入实现国际化的翻译的相关的包,高阶组件
import { withTranslation, getI18n } from 'react-i18next';
// 引入connect
import {connect} from 'react-redux'
// 引入action-creators.js中的方法
import {removeUser} from '../../redux/action-creators.js'
import dayjs from 'dayjs'
const { Header } = Layout;
@connect((state)=>(
  {username:state.user.user.username,
  title: state.title}),{removeUser})
@withTranslation()
class HeaderMain extends Component {
  
  state = {
    isScreen: true,
    isEnglish: getI18n().language === 'en',
    //time: this.getTime()
    time: this.time
  }
  // 切换全屏效果
  changeScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
  // 全屏的change事件的回调
  screenChange = () => {
    const isScreen = !this.state.isScreen
    this.setState({
      isScreen
    })
  }
  getTime = () => dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') // 展示
  // 界面渲染完毕的生命周期函数,刷新界面
  componentDidMount() {
    console.log(Date.now())
    screenfull.on('change', this.screenChange);
    // 设置定时器
    this.timer = setInterval(() => {
      this.setState({
        time:this.getTime()
      })
    },1000)
  }
  // 组件不使用是在卸载之前移除监听器
  componentWillUnmount() {
    screenfull.off('change', this.screenChange);
    // 清除定时器
    clearInterval(this.timer)
  }
  // 国际化
  changeLanguage = () => {
    const isEnglish = !this.state.isEnglish
    // 改变翻译的方式,是en还是zh-CN
    this.props.i18n.changeLanguage( isEnglish ? 'en' : 'zh-CN' )
    this.setState({
      isEnglish
    })
  }
  
  // 退出操作
  loginOut=()=>{
    Modal.confirm({
      title:getI18n().language==='en'?'Do you Want to delete these items?':'您确定要删除这些吗?',
      okText:getI18n().language==='en'?'ok':'确定',
      cancelText:getI18n().language==='en'?'cancel':'取消',
      onOk:()=> {
        this.props.removeUser()
      }
    })
  }
  
  render() {
    const { isScreen, isEnglish, time } = this.state
    const {username,title,t} = this.props
    
    // console.log(this.props)
    return (
      <Header style={{ background: '#fff', padding: 0 }} className="header-main">
        <div className="header-top">
          <Button size="small" onClick={this.changeScreen}><Icon type={isScreen ? 'fullscreen' : 'fullscreen-exit'} /></Button>
          <Button size="small" className="header-english" onClick={this.changeLanguage}>{isEnglish? '中文' : 'English'}</Button>
          <span>欢迎,{username}</span>
          <Button type="link" onClick={this.loginOut}>退出</Button>
        </div>
        <div className="header-content">
          <div className="header-left">{t(title)}</div>
          <div className="header-right">{time}</div>
        </div>

      </Header>
    );
  }
}

export default HeaderMain;