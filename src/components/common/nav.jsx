import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import {Menu} from 'element-react'
import Pos from '../../pages/Pos'
import Welcome from '../../pages/Welcome'
import './style.css'
class Nav extends Component {
  render() {
    return (
      <div className="nav-wrapper">
      <div className="left-nav">
        <ul>
          <li>
            <Link to="/pos">
              <i className="icon iconfont icon-goumai"></i>
              <div>收银</div>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <i className="icon iconfont icon-dianpu"></i>
              <div>店铺</div>
            </Link>
          </li>
          <li>
            <Link to="/raw">
              <i className="icon iconfont icon-hanbao"></i>
              <div>原料</div>
            </Link>
          </li>
          <li>
            <Link to="/member">
              <i className="icon iconfont icon-huiyuanqia"></i>
              <div>会员</div>
            </Link>
          </li>
          <li>
            <Link to="/statistics">
              <i className="icon iconfont icon-zuanshi"></i>
              <div>统计</div>
            </Link>
          </li>
          <li>
            <Link to="/setting">
              <i className="icon iconfont icon-gongnengjianyi"></i>
              <div>设置</div>
            </Link>
          </li>
        </ul>
      </div>
      <Router>
        <div className="container-wrap">
          <Switch>
            <Route exact
                   path="/"
                   render={props => (
                     <Welcome props={props}/>
                   )}
            />
            <Route exact
                   path="/pos"
                   render={props => (
                     <Pos props={props}/>
                   )}
            />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default Nav;