import React, { Component } from 'react';
import { Button } from 'antd'
import WithCheckLogin from '../../containers/with-check-login/WithCheckLogin.jsx'
@WithCheckLogin
class Admin extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary</Button>
      </div>
    );
  }
}

export default Admin;
