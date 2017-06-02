/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
} from 'react-native';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
var Platform = require('Platform');
export default class Device extends Component {
  constructor(props) {
    super(props);
  }
  isAndroid(){
    if (Platform.OS === 'android') {
        return true;
    }else{
        return false;
    }
  }
  navbarHeight(){

    return (this.isAndroid()?54:44);
  }
  marginTop(hasNavbar){
    if (hasNavbar)
    {
        return (this.isAndroid()?this.navbarHeight():(this.navbarHeight()+this.statusBarHeight()));
    }
    else
    {
        return 0;
    }

  }
  statusBarHeight(){
    return 20;
  }
  tabbarHeight(){
    if (Platform.OS === 'android') {
        return 55;
    }else{
        return 49;
    }
  }
  //容器高度（有导航条和tabbar情况下的高度）
  containerHeight(hasNavbar,hasTabbar){
    var navH = !hasNavbar?-20:this.navbarHeight();
    var tabH = !hasTabbar?0:this.tabbarHeight();

    return ScreenHeight-this.statusBarHeight()-navH-tabH;
  }

}
